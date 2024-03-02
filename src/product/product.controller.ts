import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpException,
    HttpStatus,
    Param,
    Post,
    Query,
    Req,
    UseGuards,
} from '@nestjs/common';
import { ProductDto } from 'src/dto/productDto';
import { AuthGuard } from 'src/guards/auth.guard';
import { Product } from 'src/interface/product.interface';
import { LoggerService } from 'src/logger/logger.service';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    private readonly AppName: string = 'ProductController';
    constructor(
        private productService: ProductService,
        private logger: LoggerService
    ) {}

    @HttpCode(200)
    @UseGuards(AuthGuard)
    @Post('/add')
    async addProduct(@Req() req, @Body() body: ProductDto): Promise<Product> {
        const wholeseller_id = req?.user?.userId;
        this.logger.log(
            `addProduct started with id - ${wholeseller_id}`,
            `${this.AppName}`
        );
        if (!wholeseller_id) {
            this.logger.error(
                `addProduct failed as wholeseller id is not passed- ${wholeseller_id}`,
                `${this.AppName}`
            );
            throw new HttpException(
                {
                    status: HttpStatus.UNAUTHORIZED,
                    message: 'Authorization Failed',
                },
                HttpStatus.UNAUTHORIZED
            );
        }
        return await this.productService.addProducts(wholeseller_id, body);
    }

    @HttpCode(200)
    @UseGuards(AuthGuard)
    @Get('/:wholeseller')
    async getProducts(
        @Param('wholeseller') wholeseller: string,
        @Query() query
    ) {
        this.logger.log(
            `getProducts started with id - ${wholeseller}`,
            `${this.AppName}`
        );
        if (!wholeseller) {
            this.logger.error(
                `getProducts failed as wholeseller id is not passed- ${wholeseller}`,
                `${this.AppName}`
            );
            throw new HttpException(
                {
                    status: HttpStatus.BAD_REQUEST,
                    message: 'Please pass param',
                },
                HttpStatus.BAD_REQUEST
            );
        }
        return await this.productService.getProductsOfAWholeSeller(
            wholeseller,
            query
        );
    }
}
