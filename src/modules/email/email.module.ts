import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { NunjucksModule } from 'src/integrations/nunjucks/nunjucks.module';
import { NodemailerModule } from 'src/integrations/nodemailer/nodemailer.module';
import { EmailController } from './email.controller';

@Module({
  imports: [NunjucksModule, NodemailerModule],
  controllers: [EmailController],
  providers: [EmailService],
})
export class EmailModule {}
