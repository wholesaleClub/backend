import { Document } from 'mongoose';

export interface User extends Document {
    readonly phone_number: string;
    readonly email: string;
    readonly otp_token?: string;
    readonly first_name: string;
    readonly last_name?: string;
    readonly dukan_name: string;
    readonly user_type: string;
    readonly address: string;
    readonly pin_code: string;
    readonly city: string;
    readonly upi_ids: string[];
}

export interface loginUser extends User {
    readonly access_token: string;
}
