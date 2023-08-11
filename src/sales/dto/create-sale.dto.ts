import { Type } from 'class-transformer';
import { Sale } from '../entities/sale.entity';
import {
  ArrayNotEmpty,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';

export class SoldProductsDto {
  @IsString()
  @IsUUID()
  productId: string;

  @IsNumber({}, { message: 'Products quantity is required!' })
  @Type(() => Number)
  quantity: number;
}

export class CreateSaleDto extends Sale {
  @IsNotEmpty({ message: 'A client need to be set!' })
  client: string;

  @ValidateNested({ each: true })
  @Type(() => SoldProductsDto)
  @ArrayNotEmpty()
  soldProducts: SoldProductsDto[];

  @Type(() => Number)
  totalPrice: number;
}
