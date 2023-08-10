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
}
