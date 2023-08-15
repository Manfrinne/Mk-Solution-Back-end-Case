import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { randomUUID as uuid } from 'node:crypto';
import { CreateSaleDto, SoldProductsDto } from './dto/create-sale.dto';
import { Prisma } from '@prisma/client';
import * as qrcode from 'qrcode';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class SaleService {
  constructor(private readonly prisma: PrismaService) {}

  async registerSale(
    usersId: string,
    soldProductsDto: SoldProductsDto[],
    client: string,
  ): Promise<CreateSaleDto> {
    // Calcular compra de acordo com os produtos selecionados.
    const { totalPrice, totalQuantity } = await this.processSoldProducts(
      soldProductsDto,
    );

    // Registrar processo de compra associado ao cliente (comprador).
    const createdSale = await this.createSale(
      usersId,
      client,
      totalPrice,
      totalQuantity,
    );

    // Associar todos produtos vendidos ao ID do registro da Venda.
    const saleToProductData = soldProductsDto.map((item) => ({
      id: uuid(),
      saleId: createdSale.id,
      productId: item.productId,
      quantity: item.quantity,
    }));

    await this.prisma.saleToProduct.createMany({
      data: saleToProductData,
    });

    // Gerar Payload de pagamento para o Cliente
    const qrCodeBase64 = await this.generateQRCode(createdSale);

    return {
      usersId: createdSale.usersId,
      client: createdSale.client,
      quantity: createdSale.quantity,
      totalPrice: createdSale.totalPrice,
      soldProducts: soldProductsDto,
      qrCodeBase64,
    };
  }

  private async processSoldProducts(soldProductsDto: SoldProductsDto[]) {
    let totalPrice = 0;
    let totalQuantity = 0;
    const purchasedProducts: Product[] = [];

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
      purchasedProducts.push(product);
    }

    return { totalPrice, totalQuantity, purchasedProducts };
  }

  private async createSale(
    usersId: string,
    client: string,
    totalPrice: number,
    totalQuantity: number,
  ) {
    const data: Prisma.SaleCreateInput = {
      id: uuid(),
      usersId,
      client,
      totalPrice,
      quantity: totalQuantity,
    };

    return this.prisma.sale.create({ data });
  }

  private async generateQRCode(createdSale): Promise<string> {
    const client = await this.prisma.user.findUnique({
      where: { id: createdSale.client },
    });

    const { name, email } = client;
    const { id, quantity, totalPrice } = createdSale;

    const qrCodePayload = {
      sale_id: id,
      client_name: name,
      client_email: email,
      quantity: quantity,
      total_price: totalPrice,
    };

    const qrCodeData = JSON.stringify(qrCodePayload);
    const qrCodeImage = await qrcode.toDataURL(qrCodeData);
    return qrCodeImage;
  }
}
