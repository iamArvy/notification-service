import { Test, TestingModule } from '@nestjs/testing';
import { EmailService } from './email.service';
import { NunjucksProvider } from 'src/integrations/nunjucks';
import { NodeMailerProvider } from 'src/integrations/nodemailer';
import { ConfigService } from '@nestjs/config';

const mockNunjucksProvider = {
  send: jest.fn(),
};

const mockNodemailerProvider = {
  send: jest.fn(),
};

describe('EmailService', () => {
  let service: EmailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmailService,
        {
          provide: NunjucksProvider,
          useValue: mockNunjucksProvider,
        },
        {
          provide: NodeMailerProvider,
          useValue: mockNodemailerProvider,
        },
        ConfigService,
      ],
    }).compile();

    service = module.get<EmailService>(EmailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
