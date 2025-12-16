import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import paginate from 'mongoose-paginate-v2';
import mongoose from 'mongoose';

@Schema({
  timestamps: true,
  collection: 'messages',
})
export class Notification {
  @Prop({ required: true })
  conversation_id: string;

  @Prop({ required: true })
  sender_id: string;

  @Prop()
  reply_id?: string;

  @Prop({ required: true })
  text: string;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
NotificationSchema.plugin(paginate);

export type NotificationDocument = HydratedDocument<Notification>;
export type NotificationModel = mongoose.PaginateModel<NotificationDocument>;
