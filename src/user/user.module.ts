import { Module } from '@nestjs/common';
import { Connection } from 'mongoose';
import { userSchema } from '../schemas/user.schema';
import { constants } from '../helper/constants';
import { MongodbModule } from '../mongodb/mongodb.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from '../interface/user.interface';
import { LoggerModule } from 'src/logger/logger.module';
import { JwtModule } from '@nestjs/jwt';
import { PasswordService } from 'src/services/password.service';

@Module({
    imports: [
        MongodbModule,
        LoggerModule,
        JwtModule.register({
            global: true,
            secret: constants.jwt_secret_key,
        }),
    ],
    controllers: [UserController],
    providers: [
        {
            provide: constants.USER_MODEL,
            useFactory: async (connection: Connection) => {
                return await connection.model<User>('user', userSchema);
            },
            inject: [constants.DATABASE_CONNECTION],
        },
        UserService,
        PasswordService,
    ],
    exports: [UserService],
})
export class UserModule {}
