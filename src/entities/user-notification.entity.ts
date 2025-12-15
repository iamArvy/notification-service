import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Notification } from './notification.entity';

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  collection: 'user_notifications',
})
export class UserNotification extends Document {
  @Prop({
    required: true,
    index: true,
  })
  user_id: string;

  @Prop({
    type: Types.ObjectId,
    ref: Notification.name,
    required: true,
  })
  notification_id: Types.ObjectId;
}

export const UserNotificationSchema =
  SchemaFactory.createForClass(UserNotification);
