import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import paginate from 'mongoose-paginate-v2';
import mongoose from 'mongoose';
import { NotificationEvent } from './event.schema';

@Schema({
  timestamps: true,
  collection: 'notification_settings',
})
export class Setting {
  @Prop({
    type: Types.ObjectId,
    ref: NotificationEvent.name,
    required: true,
    index: true,
  })
  event_id: Types.ObjectId;

  @Prop({ required: true, index: true })
  user_id: string;

  @Prop({ default: false })
  is_push_enabled: boolean;

  @Prop({ default: true })
  is_email_enabled: boolean;

  @Prop({ default: true })
  in_app_enabled: boolean;
}

export const SettingSchema = SchemaFactory.createForClass(Setting);

SettingSchema.plugin(paginate);

SettingSchema.index({ user_id: 1, event_id: 1 }, { unique: true });
export type SettingDocument = HydratedDocument<Setting>;

export type SettingModel = mongoose.PaginateModel<SettingDocument>;
