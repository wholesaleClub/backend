import mongoose, { Document } from 'mongoose';

export interface User extends Document {
    readonly phone_number: string;
    readonly email: string;
    readonly full_name: string;
    readonly current_company: string;
    readonly cvs: string[];
    readonly is_community_owner: boolean;
    readonly password: string;
    readonly city: string;
    readonly current_role: string;
}

export interface loginUser extends User {
    readonly access_token: string;
}
