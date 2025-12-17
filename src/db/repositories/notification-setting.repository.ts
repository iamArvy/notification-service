import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  NotificationSetting,
  NotificationSettingDocument,
  type NotificationSettingModel,
} from '../schemas';
import { MongoRepository } from './mongo.repository';

@Injectable()
export class NotificationSettingRepository extends MongoRepository<NotificationSettingDocument> {
  constructor(
    @InjectModel(NotificationSetting.name)
    protected readonly model: NotificationSettingModel,
  ) {
    super(model);
  }
}
