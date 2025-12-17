import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument, type UserModel } from '../schemas';
import { MongoRepository } from './mongo.repository';

@Injectable()
export class UserRepository extends MongoRepository<UserDocument> {
  constructor(@InjectModel(User.name) protected readonly model: UserModel) {
    super(model);
  }
}
