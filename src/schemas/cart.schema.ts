import * as mongoose from 'mongoose';
import * as nanoid from 'nanoid';
import { constants } from '../helper/constants';

export const cartSchema = new mongoose.Schema({
    proucts: [
        {
            productId: mongoose.Schema.Types.ObjectId,
            quantity: Number,
            total_price: Number,
        },
    ],
    order_id: {
        type: String,
        default: nanoid.customAlphabet(
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
            10
        )(),
    },
    status: constants.order_status,
    buyer_id: mongoose.Schema.Types.ObjectId,
    seller_id: mongoose.Schema.Types.ObjectId,
    estimated_date: Date,
    payment_type: { type: String, enum: constants.payment_type },
});
