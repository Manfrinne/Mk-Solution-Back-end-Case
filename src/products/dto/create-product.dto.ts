import { Type } from 'class-transformer';
import { Product } from '../entities/product.entity';
import { IsNumber, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateProductDto extends Product {
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  name: string;

  @IsNumber({}, { message: 'Product value is required!' })
  @Type(() => Number)
  price: number;

  @IsNumber({}, { message: 'Specify the quantity of the product!' })
  @Type(() => Number)
  inventory: number;
}
