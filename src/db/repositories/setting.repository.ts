import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Setting, SettingDocument, type SettingModel } from '../schemas';
import { MongoRepository } from './mongo.repository';

@Injectable()
export class SettingRepository extends MongoRepository<SettingDocument> {
  constructor(
    @InjectModel(Setting.name)
    protected readonly model: SettingModel,
  ) {
    super(model);
  }
}
