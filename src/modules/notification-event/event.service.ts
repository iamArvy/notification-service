import { ConflictException, Injectable } from '@nestjs/common';
import { EventRepository } from 'src/db/repositories';
import { CreateEventDto, UpdateEventDto } from './dto';

@Injectable()
export class EventService {
  constructor(private readonly repository: EventRepository) {}
  async create(data: CreateEventDto) {
    const { name } = data;
    const existing = await this.repository.findUnique({ name });
    if (existing)
      throw new ConflictException(
        'Notification Event with name already exists',
      );

    const event = await this.repository.create(data);
    return event;
  }

  findAll() {
    return this.repository.list();
  }

  findOne(id: string) {
    return this.repository.findByIdOrThrow(id);
  }

  async update(id: string, data: UpdateEventDto) {
    const event = await this.repository.findByIdOrThrow(id);
    await event.updateOne(data);
    return true;
  }

  remove(id: string) {
    return `This action removes a #${id} event`;
  }
}
