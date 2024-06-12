import {
    Body,
    Controller,
    Get,
    Headers,
    HttpCode,
    HttpException,
    HttpStatus,
    Post,
    UseGuards,
    Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User, loginUser } from '../interface/user.interface';
import { LoginUserDto, userSignUpDto } from 'src/dto/userDto';
import { constants } from '../helper/constants';
import { LoggerService } from '../logger/logger.service';
import { AuthGuard } from '../guards/auth.guard';
import { ResponseMessage } from '../decorators/responseMessageDecator';

@Controller('user')
export class UserController {
    private readonly AppName: string = 'UserController';
    constructor(
        private readonly userService: UserService,
        private logger: LoggerService
    ) {}

    @HttpCode(201)
    @Post('/signup')
    @ResponseMessage('User Created Successfully')
    async signupUser(
        @Body() signUpUser: userSignUpDto,
        @Headers('secret') headers
    ): Promise<User> {
        this.logger.log(
            `signupUser started with email - ${signUpUser?.email}`,
            `${this.AppName}`
        );
        if (headers !== constants?.secret) {
            this.logger.error(
                `signupUser authentication failed with secret passed - ${headers}`,
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
        return await this.userService.userSignUp(signUpUser);
    }

    @HttpCode(200)
    @Post('/login')
    @ResponseMessage('Login successfull')
    async loginUser(@Body() loginuserDto: LoginUserDto): Promise<loginUser> {
        this.logger.log(
            `loginUser started with email - ${loginuserDto?.email}`,
            `${this.AppName}`
        );
        return await this.userService.userLogin(loginuserDto);
    }

    @HttpCode(200)
    @UseGuards(AuthGuard)
    @Get('profile')
    @ResponseMessage('Fetched profile successfully')
    async getProfile(@Req() req): Promise<User> {
        const userId = req?.user?.userId;
        this.logger.log(
            `getProfile started with userId - ${userId}`,
            `${this.AppName}`
        );
        return await this.userService.getUserDetails(userId);
    }
}
