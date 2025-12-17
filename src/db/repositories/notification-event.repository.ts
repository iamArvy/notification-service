import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  NotificationEvent,
  NotificationEventDocument,
  type NotificationEventModel,
} from '../schemas';
import { MongoRepository } from './mongo.repository';

@Injectable()
export class NotificationEventRepository extends MongoRepository<NotificationEventDocument> {
  constructor(
    @InjectModel(NotificationEvent.name)
    protected readonly model: NotificationEventModel,
  ) {
    super(model);
  }
}
