import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { products } from './seed-products';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      email: 'vendedor@email.com',
      name: 'Vendedor da Loja',
      password: await bcrypt.hash('seller', 2),
      role: 'seller',
    },
  });

  await prisma.user.create({
    data: {
      email: 'comprador@email.com',
      name: 'Comprador de Produtos',
      password: await bcrypt.hash('buyer', 2),
      role: 'buyer',
    },
  });

  for (const product of products) {
    await prisma.product.create({
      data: product,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
