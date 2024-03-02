import {
    IsBoolean,
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsString,
    MaxLength,
    Min,
} from 'class-validator';
import { constants } from 'src/helper/constants';

export class ProductDto {
    @IsNotEmpty()
    @IsString()
    @IsEnum(constants.categories)
    category: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(40)
    name: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(40)
    unit: string;

    @IsNotEmpty()
    @IsNumber({ allowNaN: false })
    @Min(1)
    current_stock: number;

    @IsNotEmpty()
    @IsNumber({ allowNaN: false })
    @Min(1)
    price_per_unit: number;

    @IsNotEmpty()
    @IsNumber({ allowNaN: false })
    @Min(1)
    mrp: number;

    @IsNotEmpty()
    @IsNumber({ allowNaN: false })
    @Min(1)
    default_discount: number;

    @IsBoolean()
    quantity_discount_flag: boolean;

    quantity_discounts?: object;

    @IsNotEmpty()
    @IsString()
    product_pic: string;
}

export class CreateProductDto extends ProductDto {
    wholeseller_id: string;
}
