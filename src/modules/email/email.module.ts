import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { NunjucksModule } from 'src/integrations/nunjucks/nunjucks.module';
import { NodemailerModule } from 'src/integrations/nodemailer/nodemailer.module';

@Module({
  imports: [NunjucksModule, NodemailerModule],
  providers: [EmailService],
})
export class EmailModule {}
