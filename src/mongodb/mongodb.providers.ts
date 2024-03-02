import * as mongoose from 'mongoose';
import { constants } from '../helper/constants';

export const mongoDbproviders = [
    {
        provide: constants.DATABASE_CONNECTION,
        useFactory: async () => {
            const client = await mongoose.connect(constants.db_url);
            return client;
        },
    },
];
