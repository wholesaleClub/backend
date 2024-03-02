import * as mongoose from 'mongoose';
import { constants } from '../helper/constants';

export const productSchema = new mongoose.Schema(
    {
        wholeseller_id: {
            type: mongoose.Schema.Types.ObjectId,
            index: true,
            required: true,
        },
        category: { type: String, index: true, enum: constants.categories },
        name: String,
        unit: { type: String },
        current_stock: Number,
        price_per_unit: Number,
        mrp: Number,
        default_discount: Number,
        quantity_discount_flag: Boolean,
        quantity_discounts: [
            {
                quantity: Number,
                discount: Number,
            },
        ],
        product_pic: String,
        top_sell: Boolean,
        sold_count: { type: Number, default: 0 },
    },
    { timestamps: true }
);
