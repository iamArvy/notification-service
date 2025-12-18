import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { NotificationEvent, EventDocument, type EventModel } from '../schemas';
import { MongoRepository } from './mongo.repository';

@Injectable()
export class EventRepository extends MongoRepository<EventDocument> {
  constructor(
    @InjectModel(NotificationEvent.name)
    protected readonly model: EventModel,
  ) {
    super(model);
  }
}
