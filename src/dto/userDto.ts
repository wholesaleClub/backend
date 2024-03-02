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
    @IsString()
    @IsPhoneNumber()
    @IsNotEmpty()
    phone_number: string;

    @IsEmail()
    @IsNotEmpty()
    @IsString()
    email: string;

    @IsOptional()
    @IsString()
    otp_token: string;

    @IsString()
    first_name: string;

    @IsOptional()
    @IsString()
    last_name: string;

    @IsString()
    @IsNotEmpty()
    dukan_name: string;

    @IsNotEmpty()
    @IsString()
    @IsEnum(userType)
    user_type: string;

    @IsNotEmpty()
    @IsString()
    address: string;

    @IsNotEmpty()
    @IsString()
    pin_code: string;

    @IsNotEmpty()
    @IsString()
    city: string;

    @IsArray()
    @IsString({ each: true })
    upi_ids: [string];
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
