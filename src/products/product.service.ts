import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { randomUUID as uuid } from 'node:crypto';

import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const data: Prisma.ProductCreateInput = {
      ...createProductDto,
      id: uuid(),
    };

    const createdProduct = await this.prisma.product.create({ data });

    return {
      ...createdProduct,
    };
  }

  async listItens(
    page: number,
    size: number,
    sort: string,
    order: string,
    search: string,
  ) {
    const results = await this.prisma.product.findMany({
      skip: page * size,
      take: Number(size),
      where: { name: { contains: search, mode: 'insensitive' } },
      orderBy: { [sort]: order },
    });

    const totalItems = await this.prisma.product.count({
      where: { name: { contains: search, mode: 'insensitive' } },
    });

    const totalPages = Math.ceil(totalItems / size) - 1;
    const currentPage = Number(page);

    return {
      results,
      pagination: {
        length: totalItems,
        size: size,
        lastPage: totalPages,
        page: currentPage,
        startIndex: currentPage * size,
        endIndex: currentPage * size + (size - 1),
      },
    };
  }
}
