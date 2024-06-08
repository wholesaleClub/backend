import {
    IsArray,
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsPhoneNumber,
    IsString,
    Length,
} from 'class-validator';
import { userType } from '../enums/user.enum';

export class userSignUpDto {
    @IsEmail()
    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsString()
    full_name: string;
}

export class LoginUserDto {
    @IsNotEmpty()
    @IsString()
    @IsPhoneNumber()
    phone_number: string;

    @IsNotEmpty()
    @IsString()
    @Length(4)
    otp_token: string;
}
