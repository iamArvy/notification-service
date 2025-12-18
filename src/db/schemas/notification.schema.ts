import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import paginate from 'mongoose-paginate-v2';
import mongoose from 'mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { NotificationEvent } from './event.schema';

@Schema({
  timestamps: true,
  collection: 'notifications',
})
export class Notification {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: NotificationEvent.name,
    required: true,
    index: true,
  })
  event_id: MongooseSchema.Types.ObjectId;

  @Prop({ required: true, index: true })
  user_id: string;

  @Prop({ type: MongooseSchema.Types.Mixed })
  payload: Record<string, any>;

  @Prop({ default: false, index: true })
  seen: boolean;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);

NotificationSchema.plugin(paginate);

NotificationSchema.index({ user_id: 1, createdAt: -1 });

export type NotificationDocument = HydratedDocument<Notification>;

export type NotificationModel = mongoose.PaginateModel<NotificationDocument>;
