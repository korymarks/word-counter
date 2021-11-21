import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WordCounterModule } from './wordCounter/wordCounter.module';

@Module({
  imports: [WordCounterModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
