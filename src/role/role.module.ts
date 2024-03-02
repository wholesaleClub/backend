import { Module } from '@nestjs/common';
import { LoggerModule } from 'src/logger/logger.module';
import { MongodbModule } from 'src/mongodb/mongodb.module';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { constants } from '../helper/constants';
import { Connection } from 'mongoose';
import { roleSchema } from 'src/schemas/role.schema';
import { Role } from '../interface/role.interface';

@Module({
    imports: [MongodbModule, LoggerModule],
    controllers: [RoleController],
    providers: [
        {
            provide: constants.ROLE_MODEL,
            useFactory: async (connection: Connection) => {
                return await connection.model<Role>('role', roleSchema);
            },
            inject: [constants.DATABASE_CONNECTION],
        },
        RoleService,
    ],
})
export class RoleModule {}
