import { EmailTemplates } from '../enum/mail.enum';

/**
 * The standard payload for sending an email via the EmailService.
 * This is used by other services (e.g., WaitlistService) to build a request.
 */
export interface IEmailPayload {
  from?: { email: string; name?: string };
  to: { email: string; name?: string }[];
  subject: string;
  templateNameID: EmailTemplates;
  templateData: Record<string, unknown>;
  text?: string;
}
