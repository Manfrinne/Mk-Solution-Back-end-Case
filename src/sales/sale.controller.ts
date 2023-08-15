import { Body, Controller, Post } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { SaleService } from './sale.service';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from '@prisma/client';

@Controller('sales')
export class SaleController {
  constructor(private readonly saleService: SaleService) {}

  @Post()
  async create(
    @CurrentUser() currentUsers: User,
    @Body() createSaleDto: CreateSaleDto,
  ) {
    return this.saleService.registerSale(
      currentUsers.id,
      createSaleDto.soldProducts,
      createSaleDto.client,
    );
  }
}
