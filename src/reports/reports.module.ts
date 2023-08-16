import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { SendMailProducerService } from 'src/jobs/sendMail-producer-service';
import { BullModule } from '@nestjs/bull';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ReportsController],
  providers: [ReportsService, PrismaService, SendMailProducerService],
  imports: [
    BullModule.registerQueue({
      name: 'sendMail-queue',
    }),
  ],
})
export class ReportsModule {}
