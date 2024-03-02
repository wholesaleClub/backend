import * as mongoose from 'mongoose';
import * as nanoid from 'nanoid';
import { User } from '../interface/user.interface';
import { constants } from '../helper/constants';

export const userSchema = new mongoose.Schema<User>(
    {
        phone_number: String,
        email: String,
        otp_token: {
            type: String,
            default: nanoid.customAlphabet('0123456789', 4)(),
        },
        first_name: String,
        last_name: String,
        role_id: {
            type: mongoose.Schema.Types.ObjectId,
            index: true,
            required: true,
        },
        role_name: String,
        address: String,
        pin_code: String,
        city: String,
        current_company: String,
        cvs: [String],
    },
    { timestamps: true }
);

userSchema.index({ phone_number: 1 }, { unique: true });

export const UserModel: mongoose.Model<User> = mongoose.model<User>(
    'user',
    userSchema,
    'user'
);
