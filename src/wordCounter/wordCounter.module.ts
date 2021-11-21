import { Module } from '@nestjs/common';
import { WordCounterController } from './wordCounter.controller';
import { WordCounterService } from './wordCounter.service';
import { LeaderBoardService } from './leaderBoard.service';

@Module({
  controllers: [WordCounterController],
  providers: [WordCounterService, LeaderBoardService],
  exports: [LeaderBoardService],
})
export class WordCounterModule {}
