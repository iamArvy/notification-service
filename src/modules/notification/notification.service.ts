import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { NotificationRepository } from 'src/db/repositories';

@Injectable()
export class NotificationService {
  constructor(private readonly repository: NotificationRepository) {}
  create(createNotificationDto: CreateNotificationDto) {
    return this.repository.create(createNotificationDto);
  }

  findAll(user_id: string) {
    return this.repository.list({
      user_id,
    });
  }

  async clearUserNotifications(user_id: string) {
    await this.repository.deleteMany({
      user_id,
    });
    return true;
  }

  async markAllAsRead(user_id: string) {
    const filter = {
      user_id,
    };

    const update = {
      seen: true,
    };

    await this.repository.updateMany(filter, update);
    return true;
  }

  findOne(id: string) {
    return this.repository.findByIdOrThrow(id);
  }

  async read(id: string, user_id: string) {
    const notification = await this.repository.findByIdOrThrow(id);
    if (notification.user_id !== user_id)
      throw new ForbiddenException('Incorrect User');
    notification.seen = true;
    await notification.save();
    return true;
  }

  async remove(id: string, user_id: string) {
    const notification = await this.repository.findByIdOrThrow(id);
    if (notification.user_id !== user_id)
      throw new ForbiddenException('Incorrect User');
    await notification.deleteOne();
    return true;
  }
}
