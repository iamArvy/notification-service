import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import paginate from 'mongoose-paginate-v2';
import mongoose from 'mongoose';

@Schema({
  timestamps: true,
  collection: 'users',
})
export class User {
  @Prop({ required: true, index: true, unique: true })
  user_id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true, index: true })
  email: string;

  @Prop({ type: [String], default: [] })
  device_tokens?: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.plugin(paginate);

export type UserDocument = HydratedDocument<User>;

export type UserModel = mongoose.PaginateModel<UserDocument>;
