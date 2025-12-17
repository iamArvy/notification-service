import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Headers,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { ApiSecurity } from '@nestjs/swagger';
import { API_KEY_SECURITY_NAME, UserIdHeader } from 'src/common/constants';

@ApiSecurity(API_KEY_SECURITY_NAME)
@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  // create(@Body() createNotificationDto: CreateNotificationDto) {
  //   return this.notificationService.create(createNotificationDto);
  // }
  @Get()
  findAll(@Headers(UserIdHeader) userId: string) {
    return this.notificationService.findAll(userId);
  }

  @Delete('clear')
  clearUserNotifications(@Headers(UserIdHeader) userId: string) {
    return this.notificationService.clearUserNotifications(userId);
  }

  @Post('read')
  markAllAsRead(@Headers(UserIdHeader) userId: string) {
    return this.notificationService.markAllAsRead(userId);
  }

  @Post(':id/read')
  seen(@Headers(UserIdHeader) userId: string, @Param('id') id: string) {
    return this.notificationService.read(id, userId);
  }

  @Delete(':id')
  remove(@Headers(UserIdHeader) userId: string, @Param('id') id: string) {
    return this.notificationService.remove(id, userId);
  }
}
