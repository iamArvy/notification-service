import { PartialType } from '@nestjs/swagger';
import { CreateNotificationEventDto } from './create-notification-event.dto';

export class UpdateNotificationEventDto extends PartialType(
  CreateNotificationEventDto,
) {}
