import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from 'src/db/repositories';

@Injectable()
export class UserService {
  constructor(private readonly repository: UserRepository) {}

  async create(dto: CreateUserDto) {
    const { user_id, email } = dto;
    const existingUser = await this.repository.findUnique({ user_id });
    const existingEmail = await this.repository.findUnique({ email });

    if (existingUser || existingEmail)
      throw new ConflictException('User already exists');

    const user = await this.repository.create(dto);
    return user;
  }

  findAll() {
    return this.repository.list();
  }

  async findOne(user_id: string) {
    const user = await this.repository.findUnique({ user_id });
    if (!user) throw new NotFoundException('user not found');
    return user;
  }

  async update(user_id: string, dto: UpdateUserDto) {
    const user = await this.repository.findUnique({ user_id });
    if (!user) throw new NotFoundException('user not found');
    await user.updateOne(dto);
    return true;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
