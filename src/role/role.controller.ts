import {
    Body,
    Controller,
    Headers,
    HttpCode,
    HttpException,
    HttpStatus,
    Post,
} from '@nestjs/common';
import { constants } from '../helper/constants';
import { roleDto } from 'src/dto/roleDto';
import { Role } from 'src/interface/role.interface';
import { LoggerService } from 'src/logger/logger.service';
import { RoleService } from './role.service';
import { ResponseMessage } from 'src/decorators/responseMessageDecator';

@Controller('role')
export class RoleController {
    private readonly AppName: string = 'RoleController';
    constructor(
        private readonly roleService: RoleService,
        private logger: LoggerService
    ) {}

    @HttpCode(201)
    @Post('')
    @ResponseMessage('Role created successfully')
    async createRole(
        @Body() role: roleDto,
        @Headers('secret') headers
    ): Promise<Role> {
        this.logger.log(
            `createRole started for role name - ${role?.name}`,
            `${this.AppName}`
        );
        if (headers !== constants?.secret) {
            this.logger.error(
                `createRole authentication failed with secret passed - ${headers}`,
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
        return await this.roleService.createRole(role);
    }
}
