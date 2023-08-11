import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { randomUUID as uuid } from 'node:crypto';
import { SoldProductsDto } from './dto/create-sale.dto';
import { Sale } from './entities/sale.entity';
import { Prisma } from '@prisma/client';

@Injectable()
export class SaleService {
  constructor(private readonly prisma: PrismaService) {}

  async registerSale(
    usersId: string,
    soldProductsDto: SoldProductsDto[],
    client: string,
  ): Promise<Sale> {
    let totalPrice = 0;
    let totalQuantity = 0;

    for (const soldProductDto of soldProductsDto) {
      const { productId, quantity } = soldProductDto;

      const product = await this.prisma.product.findUnique({
        where: { id: productId },
      });

      if (!product) {
        throw new NotFoundException(`Product with ID ${productId} not found.`);
      }

      await this.prisma.product.update({
        where: { id: productId },
        data: { inventory: product.inventory - quantity },
      });

      const productPrice = product.price * quantity;
      totalPrice += productPrice;
      totalQuantity += quantity;
    }

    const data: Prisma.SaleCreateInput = {
      id: uuid(),
      usersId,
      client,
      totalPrice,
      quantity: totalQuantity,
    };

    const createdSale = await this.prisma.sale.create({ data });

    const saleToProductData = soldProductsDto.map((item) => ({
      id: uuid(),
      saleId: createdSale.id,
      productId: item.productId,
      quantity: item.quantity,
    }));

    await this.prisma.saleToProduct.createMany({
      data: saleToProductData,
    });

    const purchasedProducts = await this.prisma.product.findMany({
      where: {
        id: { in: soldProductsDto.map((item) => item.productId) },
      },
    });

    return {
      ...createdSale,
      products: purchasedProducts,
    };
  }
}
