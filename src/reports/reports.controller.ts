import { Controller } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { SendMailProducerService } from 'src/jobs/sendMail-producer-service';
import * as cron from 'node-cron';

@Controller()
export class ReportsController {
  private isTaskScheduled = false;

  constructor(
    private sendMailService: SendMailProducerService,
    private readonly reportsService: ReportsService,
  ) {
    this.reportsScheduleCronJob();
  }

  private async reportsScheduleCronJob() {
    if (!this.isTaskScheduled) {
      // Enviar todo dia 2:00 AM, modifique para '* * * * *' (um email por minuto)
      cron.schedule('* * * * *', async () => {
        const reports = await this.reportsService.generateBestSellingReport();

        await this.sendMailService.sendMail(reports);
      });

      this.isTaskScheduled = true;
    }
  }
}
