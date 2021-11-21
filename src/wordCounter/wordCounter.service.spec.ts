import { Test, TestingModule } from '@nestjs/testing';
import { WordCounterService } from './wordCounter.service';

describe('WordCounterService', () => {
  let service: WordCounterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WordCounterService],
    }).compile();

    service = module.get<WordCounterService>(WordCounterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
