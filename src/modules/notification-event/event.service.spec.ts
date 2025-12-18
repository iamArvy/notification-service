import { Test, TestingModule } from '@nestjs/testing';
import { EventService } from './event.service';

const mockEventRepo = {
  create: jest.fn(),
};

describe('EventService', () => {
  let service: EventService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [{ provide: EventService, useValue: mockEventRepo }],
    }).compile();

    service = module.get<EventService>(EventService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
