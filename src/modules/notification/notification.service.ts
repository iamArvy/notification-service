import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { NotificationRepository } from 'src/db/repositories';

@Injectable()
export class NotificationService {
  constructor(private readonly repository: NotificationRepository) {}
  create(createNotificationDto: CreateNotificationDto) {
    return this.repository.create(createNotificationDto);
  }

  findAll() {
    return this.repository.list();
  }

  findOne(id: string) {
    return this.repository.findByIdOrThrow(id);
  }

  update(id: string, updateNotificationDto: UpdateNotificationDto) {
    return this.repository.update(id, updateNotificationDto);
  }

  remove(id: string) {
    return this.repository.delete(id);
  }
}
