import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import paginate from 'mongoose-paginate-v2';
import mongoose from 'mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { NotificationEvent } from './notification-event.schema';

@Schema({
  timestamps: true,
  collection: 'notification_settings',
})
export class NotificationSetting {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: NotificationEvent.name,
    required: true,
    index: true,
  })
  event_id: MongooseSchema.Types.ObjectId;

  @Prop({ required: true, index: true })
  user_id: string;

  @Prop({ default: false })
  is_push_enabled: boolean;

  @Prop({ default: true })
  is_email_enabled: boolean;

  @Prop({ default: true })
  in_app_enabled: boolean;
}

export const NotificationSettingSchema =
  SchemaFactory.createForClass(NotificationSetting);

NotificationSettingSchema.plugin(paginate);

NotificationSettingSchema.index({ user_id: 1, event_id: 1 }, { unique: true });
export type NotificationSettingDocument = HydratedDocument<NotificationSetting>;

export type NotificationSettingModel =
  mongoose.PaginateModel<NotificationSettingDocument>;
