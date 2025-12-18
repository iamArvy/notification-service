import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

import { MailConfig } from 'src/config/mail.config';
import {
  NODEMAILER_CONFIG_NAME,
  NODEMAILER_MAX_CONNECTIONS,
  NODEMAILER_POOL,
} from './nodemailer.constants';

@Injectable()
export class NodeMailerProvider {
  private readonly logger = new Logger(NodeMailerProvider.name);
  private transporter: nodemailer.Transporter;

  constructor(private readonly config: ConfigService) {
    const { host, port, auth } = config.getOrThrow<MailConfig>(
      NODEMAILER_CONFIG_NAME,
    );
    // Initialize the transporter
    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth,
      pool: NODEMAILER_POOL,
      maxConnections: NODEMAILER_MAX_CONNECTIONS,
    });
  }

  send(options: nodemailer.SendMailOptions): any {
    return this.transporter.sendMail(options);
  }
}
