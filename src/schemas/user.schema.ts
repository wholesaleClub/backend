import * as mongoose from 'mongoose';
import { currentRole } from 'src/enums/user.enum';
import { User } from '../interface/user.interface';

export const userSchema = new mongoose.Schema<User>(
    {
        phone_number: String,
        email: String,
        full_name: String,
        is_community_owner: {
            type: Boolean,
            default: false,
        },
        password: String,
        current_company: String,
        cvs: [String],
        city: String,
        current_role: {
            type: String,
            enum: currentRole,
        },
    },
    { timestamps: true }
);

userSchema.index({ email: 1 }, { unique: true });

export const UserModel: mongoose.Model<User> = mongoose.model<User>(
    'user',
    userSchema,
    'user'
);
