import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TEMPLATE_PATH } from 'src/common/constants/mail';
import { IEmailPayload } from 'src/common/interfaces';
import { MailConfig } from 'src/config/mail.config';
import { NODEMAILER_CONFIG_NAME } from 'src/integrations/nodemailer/nodemailer.contants';
import { NodeMailerProvider } from 'src/integrations/nodemailer/nodemailer.provider';
import { NunjucksProvider } from 'src/integrations/nunjucks/nunjucks.provider';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private fromAddress: string | undefined;
  private fromName: string | undefined;
  constructor(
    private readonly nunjucks: NunjucksProvider,
    private readonly nodemailer: NodeMailerProvider,
    private readonly config: ConfigService,
  ) {
    const { from } = this.config.getOrThrow<MailConfig>(NODEMAILER_CONFIG_NAME);
    this.fromAddress = from.address;
    this.fromName = from.name;
  }
  /**
   * Sends an email using the provided payload.
   * This is the main public method for this service.
   * @param payload The EmailPayload object
   */
  async sendMail(payload: IEmailPayload): Promise<void> {
    const { from, to, subject, templateNameID, templateData, text } = payload;

    const html = await this.nunjucks.compile(
      TEMPLATE_PATH(templateNameID),
      templateData,
    );

    const fromAddress = from?.email ?? this.fromAddress;
    const fromName = from?.name ?? this.fromName ?? 'Open School Portal';

    const mailOptions = {
      from: `"${fromName}" <${fromAddress}>`,
      to: to
        .map((t) => (t.name ? `"${t.name}" <${t.email}>` : t.email))
        .join(', '),
      subject: subject,
      html: html,
      text: text, // Optional plain-text version
    };

    // Send the email
    try {
      this.nodemailer.send(mailOptions);
      this.logger.log(`Email sent successfully to ${mailOptions.to}`);
    } catch (error) {
      this.logger.error(`Failed to send email to ${mailOptions.to}`, error);
      throw error;
    }
  }
}
