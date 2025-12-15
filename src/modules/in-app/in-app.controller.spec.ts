import { Test, TestingModule } from '@nestjs/testing';
import { InAppController } from './in-app.controller';

describe('InAppController', () => {
  let controller: InAppController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InAppController],
    }).compile();

    controller = module.get<InAppController>(InAppController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
