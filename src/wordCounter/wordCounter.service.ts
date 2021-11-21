import { Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.REQUEST })
export class WordCounterService {
  private wordCounts = new Map<string, number>();

  countWords(text: string): void {
    text
      .replace(/[,;.\n\s{1,}]/gi, ' ')
      .toLocaleLowerCase()
      .split(' ')
      .forEach((d) => {
        if (d === '') return;

        if (this.wordCounts.has(d)) {
          const currentWordTotal = this.wordCounts.get(d);
          return this.wordCounts.set(d, currentWordTotal + 1);
        }

        return this.wordCounts.set(d, 1);
      });
  }

  getWordCounts() {
    return this.wordCounts;
  }
}
