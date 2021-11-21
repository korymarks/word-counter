import { Injectable, Scope } from '@nestjs/common';
import { sort } from 'fast-sort';
import { LeaderBoardDto } from './leaderBoard.dto';
import { LeaderBoardItem, WordCountMap } from './types';

@Injectable({ scope: Scope.REQUEST })
export class LeaderBoardService {
  private board: LeaderBoardItem[] = [];

  public rank(wordCountMap: WordCountMap, top = 5): LeaderBoardDto[] {
    this.sort(wordCountMap);
    return this.getTop(top);
  }

  private sort(map: WordCountMap): void {
    this.board = sort(Array.from(map.entries())).desc(([, count]) => count);
  }

  private getTop(count: number) {
    const currentTop = this.board.slice(0, count);
    const lastItem = currentTop?.[currentTop.length - 1];
    const results = this.recurseForPossibleTiedItems(
      count,
      lastItem?.[1],
      currentTop,
    );
    return this.transformTuplesIntoObjects(results);
  }

  private transformTuplesIntoObjects(
    tuples: LeaderBoardItem[],
  ): LeaderBoardDto[] {
    return tuples.map((result) => ({ word: result[0], count: result[1] }));
  }

  private recurseForPossibleTiedItems(
    index: number,
    value: number,
    items: LeaderBoardItem[],
  ): LeaderBoardItem[] {
    if (!this.board?.[index]) return items;
    if (this.board[index][1] === value)
      return this.recurseForPossibleTiedItems(index + 1, value, [
        ...items,
        this.board[index],
      ]);
    return items;
  }
}
