import { Injectable, Scope } from '@nestjs/common';
import { WordCountMap } from './types';

@Injectable({ scope: Scope.REQUEST })
export class WordCounterService {
  private wordCounts: WordCountMap = new Map();

  countWords(text: string): void {
    text
      .replace(/[,;!?:.\n\s{1,}]/gi, ' ')
      .toLocaleLowerCase()
      .split(' ')
      .forEach((d) => {
        if (d === '') return;

        if (this.wordCounts.has(d)) {
          const currentWordTotal = this.wordCounts.get(d);
          return this.wordCounts.set(d, currentWordTotal + 1);
        }

        this.wordCounts.set(d, 1);
      });
  }

  getWordCounts(): WordCountMap {
    return this.wordCounts;
  }
}
