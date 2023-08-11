import { Product } from 'src/products/entities/product.entity';

export class Sale {
  id?: string;
  usersId: string;
  products?: Product[];
  client: string;
  quantity: number;
  totalPrice: number;
}
