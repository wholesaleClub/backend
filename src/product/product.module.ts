import { Module } from '@nestjs/common';
import { Connection } from 'mongoose';
import { constants } from 'src/helper/constants';
import { Product } from 'src/interface/product.interface';
import { LoggerModule } from 'src/logger/logger.module';
import { MongodbModule } from 'src/mongodb/mongodb.module';
import { productSchema } from 'src/schemas/products.schema';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
    imports: [MongodbModule, LoggerModule],
    controllers: [ProductController],
    providers: [
        {
            provide: constants.PRODUCT_MODEL,
            useFactory: async (connection: Connection) => {
                return await connection.model<Product>(
                    'products',
                    productSchema
                );
            },
            inject: [constants.DATABASE_CONNECTION],
        },
        ProductService,
    ],
    exports: [ProductService],
})
export class ProductModule {}
