import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { UserNotification } from './user-notification.entity';

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
})
export class Notification extends Document {
  @Prop({
    required: true,
    unique: true,
    index: true,
  })
  name: string;

  @Prop({ required: true })
  email_template: string;

  @Prop({ required: true })
  push_template: string;

  @Prop({
    type: [{ type: Types.ObjectId, ref: UserNotification.name }],
    default: [],
  })
  userNotifications: Types.ObjectId[];
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
