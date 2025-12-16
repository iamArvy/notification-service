import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  Notification,
  NotificationDocument,
  type NotificationModel,
} from '../schemas';
import { MongoRepository } from './mongo.repository';

@Injectable()
export class NotificationRepository extends MongoRepository<NotificationDocument> {
  constructor(
    @InjectModel(Notification.name) protected readonly model: NotificationModel,
  ) {
    super(model);
  }
}
