import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ReportsService {
  constructor(private readonly prisma: PrismaService) {}

  async generateBestSellingReport(): Promise<string> {
    const bestSellingProducts: { [key: string]: number } = {};

    const orderBestSellingProducts = await this.prisma.saleToProduct.groupBy({
      by: ['productId'],
      _sum: {
        quantity: true,
      },
      orderBy: {
        _sum: {
          quantity: 'desc',
        },
      },
    });

    for (const orderBestSellingProduct of orderBestSellingProducts) {
      const productId = orderBestSellingProduct.productId;
      const quantity = orderBestSellingProduct._sum.quantity;

      const product = await this.prisma.product.findUnique({
        where: { id: productId },
        select: {
          name: true,
        },
      });

      if (!bestSellingProducts[product.name]) {
        bestSellingProducts[product.name] = quantity;
      } else {
        bestSellingProducts[product.name] += quantity;
      }
    }

    const reportContent = `
      ${Object.entries(bestSellingProducts)
        .map(([name, quantity], index) => `${index + 1}. ${name}: ${quantity}`)
        .join('\n')}
    `;

    return reportContent;
  }
}
