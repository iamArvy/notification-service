import { Module } from '@nestjs/common';
import { NotificationEventController } from './event.controller';
import { NotificationEventService } from './event.service';

@Module({
  controllers: [NotificationEventController],
  providers: [NotificationEventService],
})
export class EventModule {}
