import { Test, TestingModule } from '@nestjs/testing';
import { LeaderBoardService } from './leaderBoard.service';
import { WordCounterController } from './wordCounter.controller';
import { WordCounterService } from './wordCounter.service';

describe('WordCounterController', () => {
  let controller: WordCounterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WordCounterController],
      providers: [WordCounterService, LeaderBoardService],
    }).compile();

    controller = module.get<WordCounterController>(WordCounterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
