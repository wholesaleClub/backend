import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import mongoose from 'mongoose';
import { CreateProductDto, ProductDto } from 'src/dto/productDto';
import { constants } from 'src/helper/constants';
import { Product } from 'src/interface/product.interface';
import { LoggerService } from 'src/logger/logger.service';

@Injectable()
export class ProductService {
    private readonly AppName: string = 'ProductService';
    constructor(
        @Inject(constants.PRODUCT_MODEL)
        private productModel: mongoose.Model<Product>,
        private logger: LoggerService
    ) {}

    async addProducts(
        wholeseller_id: string,
        product: ProductDto
    ): Promise<Product> {
        this.logger.log(
            `addProducts started with id - ${wholeseller_id}`,
            `${this.AppName}`
        );
        try {
            const createProd: CreateProductDto = {
                ...product,
                wholeseller_id,
            };
            const productToAdd = new this.productModel(createProd);
            return await productToAdd.save();
        } catch (err) {
            this.logger.error(
                `addProducts failed for wholeseller - ${wholeseller_id} with error ${err}`,
                `${this.AppName}`
            );
            throw new HttpException(
                {
                    status: err?.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
                    message: err?.message ?? 'Something went wrong',
                },
                err?.status ?? HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    async getProductsOfAWholeSeller(wholeseller_id: string, query) {
        this.logger.log(
            `getProductsOfAWholeSeller started for wholeseller - ${wholeseller_id}`,
            `${this.AppName}`
        );
        const dbQuery = {};
        if (wholeseller_id) {
            dbQuery['wholeseller_id'] = wholeseller_id;
        }
        if (query?.category) {
            if (!constants.categories?.includes(query?.category)) {
                this.logger.error(
                    `getProductOfAWholeSeller failed for wholeseller - ${wholeseller_id} `,
                    `${this.AppName}`
                );
                throw new HttpException(
                    {
                        status: HttpStatus.BAD_REQUEST,
                        message: 'Please pass correct category',
                    },
                    HttpStatus.BAD_REQUEST
                );
            }
            dbQuery['category'] = query?.category;
        }
        try {
            const products = await this.productModel
                .find(dbQuery)
                .lean()
                .exec();
            this.logger.log(
                `getProductsOfAWholeSeller succeded for wholeseller - ${wholeseller_id}`,
                `${this.AppName}`
            );

            return products;
        } catch (err) {
            this.logger.error(
                `getProductOfAWholeSeller failed for wholeseller - ${wholeseller_id} with error ${err}`,
                `${this.AppName}`
            );
            throw new HttpException(
                {
                    status: err?.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
                    message: err?.message ?? 'Something went wrong',
                },
                err?.status ?? HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
}
