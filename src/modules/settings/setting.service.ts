import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSettingDto } from './dto/create-notification-setting.dto';
import { UpdateSettingDto } from './dto/update-notification-setting.dto';
import {
  EventRepository,
  SettingRepository,
  UserRepository,
} from 'src/db/repositories';

@Injectable()
export class SettingService {
  constructor(
    private readonly repository: SettingRepository,
    private readonly userRepository: UserRepository,
    private readonly eventRepository: EventRepository,
  ) {}
  async create(dto: CreateSettingDto) {
    const { user_id, event_id } = dto;

    const user = await this.userRepository.findUnique({ user_id });

    if (!user) throw new BadRequestException('user not found');
    const event = await this.eventRepository.findByIdOrThrow(event_id);
    await this.repository.findUnique({ user_id, event_id: event._id });

    const setting = await this.repository.create(dto);
    return setting;
  }

  findAll(user_id: string) {
    return this.repository.list({
      user_id,
    });
  }

  findOne(id: string) {
    return this.repository.findByIdOrThrow(id);
  }

  async update(id: string, dto: UpdateSettingDto) {
    const setting = await this.repository.findByIdOrThrow(id);
    setting.updateOne(dto);
    return true;
  }

  async remove(id: string) {
    const setting = await this.repository.findByIdOrThrow(id);
    setting.deleteOne();
    return true;
  }
}
