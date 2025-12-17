import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { NotificationEventService } from './event.service';
import { CreateNotificationEventDto, UpdateNotificationEventDto } from './dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Notification Event')
@Controller('notification-events')
export class NotificationEventController {
  constructor(private readonly eventService: NotificationEventService) {}

  @Post()
  create(@Body() dto: CreateNotificationEventDto) {
    return this.eventService.create(dto);
  }

  @Get()
  findAll() {
    return this.eventService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateNotificationEventDto) {
    return this.eventService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventService.remove(id);
  }
}
