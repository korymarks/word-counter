import { Test, TestingModule } from '@nestjs/testing';
import { WordCounterController } from './wordCounter.controller';

describe('WordCounterController', () => {
  let controller: WordCounterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WordCounterController],
    }).compile();

    controller = module.get<WordCounterController>(WordCounterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
