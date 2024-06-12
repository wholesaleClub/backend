import * as mongoose from 'mongoose';
import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { User, loginUser } from '../interface/user.interface';
import { LoginUserDto, userSignUpDto } from '../dto/userDto';
import { constants } from '../helper/constants';
import { LoggerService } from '../logger/logger.service';
import { JwtService } from '@nestjs/jwt';
import { PasswordService } from '../services/password.service';

@Injectable()
export class UserService {
    private readonly AppName: string = 'UserService';
    constructor(
        @Inject(constants.USER_MODEL)
        private userModel: mongoose.Model<User>,
        private logger: LoggerService,
        private jwtService: JwtService,
        private passwordService: PasswordService
    ) {}

    async userSignUp(signUpUser: userSignUpDto): Promise<User> {
        this.logger.log(
            `userSignUp started with email - ${signUpUser?.email}`,
            `${this.AppName}`
        );
        try {
            const user = await this.userModel
                .findOne({
                    email: signUpUser.email,
                })
                .lean()
                .exec();
            if (user) {
                this.logger.error(
                    `User allready found for this email - ${signUpUser.email}`,
                    `${this.AppName}`
                );
                throw new HttpException(
                    {
                        status: HttpStatus.BAD_REQUEST,
                        message: 'User found for this email',
                    },
                    HttpStatus.BAD_REQUEST
                );
            }
            const hashedPassword = await this.passwordService.hashPassword(
                signUpUser.password
            );
            signUpUser.password = hashedPassword;
            const createUser = new this.userModel(signUpUser);
            return await createUser.save();
        } catch (err) {
            this.logger.error(
                `userSignUp failed with email - ${signUpUser?.email} with error ${err}`,
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

    async userLogin(loginUserDto: LoginUserDto): Promise<loginUser> {
        this.logger.log(
            `userLogin started with email - ${loginUserDto?.email}`,
            `${this.AppName}`
        );
        try {
            const user: User = await this.userModel
                .findOne({
                    email: loginUserDto?.email,
                })
                .lean()
                .exec();
            if (user) {
                const passwordMatched =
                    await this.passwordService.comparePassword(
                        loginUserDto.password,
                        user?.password
                    );
                if (passwordMatched) {
                    this.logger.log(
                        `userLogin success with email - ${loginUserDto?.email}`,
                        `${this.AppName}`
                    );
                    const payload = {
                        userId: user?._id?.toString(),
                    };
                    const access_token = await this.jwtService.signAsync(
                        payload
                    );
                    const response: loginUser = {
                        ...JSON.parse(JSON.stringify(user)),
                        access_token: access_token,
                    };
                    return response;
                } else {
                    throw new HttpException(
                        {
                            status: HttpStatus.BAD_REQUEST,
                            message: 'Please provide valid password',
                        },
                        HttpStatus.BAD_REQUEST
                    );
                }
            } else {
                throw new HttpException(
                    {
                        status: HttpStatus.BAD_REQUEST,
                        message:
                            'The number you have provided has not been registered',
                    },
                    HttpStatus.BAD_REQUEST
                );
            }
        } catch (err) {
            this.logger.error(
                `loginUser failed with email - ${loginUserDto?.email} with error ${err}`,
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

    async getUserDetails(userId: string): Promise<User> {
        try {
            this.logger.log(
                `getUserDetails started with userId - ${userId}`,
                `${this.AppName}`
            );
            const user = await this.userModel
                .findOne({
                    _id: userId,
                })
                .lean()
                .exec();
            this.logger.log(
                `getUserDetails ended with UserId - ${userId}`,
                `${this.AppName}`
            );
            return user;
        } catch (error) {
            this.logger.error(
                `getUserDetails failed with userId - ${userId} with error ${error}`,
                `${this.AppName}`
            );
            throw new HttpException(
                {
                    status: error?.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
                    message: error?.message ?? 'Something went wrong',
                },
                error?.status ?? HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
}
