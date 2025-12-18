import { Body, Controller, Post } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailPayloadDto } from './dto/send-mail.dto';

@Controller('email')
export class EmailController {
  constructor(private readonly service: EmailService) {}
  @Post()
  sendMail(@Body() payload: EmailPayloadDto) {
    return this.service.sendMail(payload);
  }
}
