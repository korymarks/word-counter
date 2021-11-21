import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Logger,
  ParseIntPipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import fs from 'fs';
import path from 'path';
import { WordCounterService } from './wordCounter.service';
import { LeaderBoardService } from './leaderBoard.service';
import { LeaderBoardDto } from './leaderBoard.dto';

@Controller('word-counter')
export class WordCounterController {
  private readonly logger = new Logger(WordCounterController.name);

  constructor(
    private readonly wordCountService: WordCounterService,
    private readonly leaderBoardService: LeaderBoardService,
  ) {}

  @Post('frequencies')
  @HttpCode(200)
  @UseInterceptors(FileInterceptor('file', { dest: './upload' }))
  async countFrequencies(
    @UploadedFile() file: Express.Multer.File,
    @Body('top', ParseIntPipe) top: number,
  ): Promise<LeaderBoardDto[]> {
    if (!file) throw new BadRequestException('A file upload is required');

    return new Promise((resolve, reject) => {
      const filePath = path.join(__dirname, '../../upload/', file.filename);
      this.logger.verbose(`Setting up read stream for file: ${file.filename}`);
      const myReadStream = fs.createReadStream(filePath);

      myReadStream.on('data', (data) => {
        this.wordCountService.countWords(data.toString());
      });

      myReadStream.on('close', () => {
        this.logger.verbose(
          `Finished reading data from read stream for file: ${file.filename}`,
        );
        const topRankings = this.leaderBoardService.rank(
          this.wordCountService.getWordCounts(),
          top,
        );
        fs.unlink(filePath, () =>
          this.logger.verbose(`Removed processed file: ${file.filename}`),
        );
        return resolve(topRankings);
      });

      myReadStream.on('error', (err) => {
        return reject(err);
      });
    });
  }
}
