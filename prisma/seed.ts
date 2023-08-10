import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { products } from './seed-products';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      email: 'admin@email.com',
      name: 'admin',
      password: await bcrypt.hash('admin', 2),
      role: 'seller',
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
