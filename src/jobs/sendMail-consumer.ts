import { MailerService } from '@nestjs-modules/mailer';
import { Process, Processor } from '@nestjs/bull';

interface SendMailJobData {
  data: string;
}

@Processor('sendMail-queue')
export class SendMailConsumer {
  constructor(private mailService: MailerService) {}

  @Process('reportSendMail-job')
  async sendMailJob(jobData: SendMailJobData) {
    const { data } = jobData;

    const productLines = data.split('\n');

    let tableRows = '';
    productLines.forEach((line) => {
      const parts = line.split(': ');
      if (parts.length === 2) {
        const [productName, quantity] = parts;
        tableRows += `<tr><td style="border: 1px solid #ddd; padding: 8px;">${productName}</td><td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${quantity}</td></tr>`;
      }
    });

    const htmlContent = `
    <h1 style="text-align: center;">Relatório de produtos mais vendidos</h1>
    <table style="border-collapse: collapse; width: 100%;">
      <thead>
        <tr>
          <th style="border: 1px solid #ddd; padding: 8px;">Nome do Produto</th>
          <th style="border: 1px solid #ddd; padding: 8px; text-align: center;">Quantidade Vendida</th>
        </tr>
      </thead>
      <tbody>
        ${tableRows}
      </tbody>
    </table>
  `;

    await this.mailService.sendMail({
      to: 'email@email.com',
      from: 'Testando envio de email <envio@email.com>',
      subject: 'Email de teste com formatação HTML',
      html: htmlContent,
    });
  }
}
