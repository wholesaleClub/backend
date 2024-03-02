import mongoose, { Document } from 'mongoose';

export interface User extends Document {
    readonly phone_number: string;
    readonly email: string;
    readonly otp_token?: string;
    readonly first_name: string;
    readonly last_name?: string;
    readonly role_id: mongoose.Schema.Types.ObjectId;
    readonly role_name: string;
    readonly address: string;
    readonly pin_code: string;
    readonly city: string;
    readonly current_company: string;
    readonly cvs: string[];
}

export interface loginUser extends User {
    readonly access_token: string;
}
