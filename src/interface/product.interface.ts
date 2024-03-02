import mongoose, { Document } from 'mongoose';

export interface Product extends Document {
    readonly wholeseller_id: mongoose.Schema.Types.ObjectId;
    readonly category: string;
    readonly name: string;
    readonly unit: string;
    readonly current_stock: number;
    readonly price_per_unit: number;
    readonly mrp: number;
    readonly default_discount: number;
    readonly quantity_discount_flag: boolean;
    readonly quantity_discounts: object;
    readonly product_pic: string;
    readonly top_sell: boolean;
    readonly sold_count: number;
}
