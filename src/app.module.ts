import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppLoggerMiddleware } from './middleware/reqResLog.middleware';
import { MongodbModule } from './mongodb/mongodb.module';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';

@Module({
    imports: [MongodbModule, UserModule, ProductModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer.apply(AppLoggerMiddleware).forRoutes('*');
    }
}
