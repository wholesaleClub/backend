import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { Role } from '../interface/role.interface';
import { constants } from '../helper/constants';
import { LoggerService } from '../logger/logger.service';
import { roleDto } from 'src/dto/roleDto';

@Injectable()
export class RoleService {
    private readonly AppName: string = 'RoleService';
    constructor(
        @Inject(constants.ROLE_MODEL)
        private roleModel: mongoose.Model<Role>,
        private logger: LoggerService
    ) {}

    async createRole(role: roleDto): Promise<Role> {
        this.logger.log(
            `createRole started for role name - ${role?.name}`,
            `${this.AppName}`
        );
        try {
            const createRole = new this.roleModel(role);
            return await createRole.save();
        } catch (err) {
            this.logger.error(
                `createRole failed for role name - ${role?.name} with error ${err}`,
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
