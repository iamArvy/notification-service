import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import paginate from 'mongoose-paginate-v2';
import mongoose from 'mongoose';

@Schema({
  timestamps: true,
  collection: 'notification_events',
})
export class NotificationEvent {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop()
  email_template?: string;

  @Prop()
  push_template?: string;

  @Prop({ required: true })
  text: string;

  @Prop({ default: true })
  is_active: boolean;
}

export const NotificationEventSchema =
  SchemaFactory.createForClass(NotificationEvent);

NotificationEventSchema.plugin(paginate);

export type NotificationEventDocument = HydratedDocument<NotificationEvent>;

export type NotificationEventModel =
  mongoose.PaginateModel<NotificationEventDocument>;
