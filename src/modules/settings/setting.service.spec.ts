import { Test, TestingModule } from '@nestjs/testing';
import { SettingService } from './setting.service';
import {
  NotificationEventRepository,
  SettingRepository,
  UserRepository,
} from 'src/db/repositories';

const mockSettingRepo = {
  create: jest.fn(),
};

const mockEventRepo = {
  create: jest.fn(),
};

const mockUserRepo = {
  create: jest.fn(),
};

describe('SettingService', () => {
  let service: SettingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SettingService,
        { provide: SettingRepository, useValue: mockSettingRepo },
        { provide: UserRepository, useValue: mockUserRepo },
        { provide: NotificationEventRepository, useValue: mockEventRepo },
      ],
    }).compile();

    service = module.get<SettingService>(SettingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
