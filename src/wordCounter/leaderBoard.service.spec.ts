import { Test, TestingModule } from '@nestjs/testing';
import { LeaderBoardService } from './leaderBoard.service';

describe('LeaderBoardService', () => {
  let service: LeaderBoardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LeaderBoardService],
    }).compile();

    service = await module.resolve<LeaderBoardService>(LeaderBoardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('rank()', () => {
    const words = {
      laughter: 8,
      hello: 25,
      funny: 13,
      laughing: 8,
      the: 3,
      world: 25,
    };
    const wordMap = new Map(Object.entries(words));

    it('has one public method named rank', () => {
      expect(service.rank).toBeDefined();
    });

    it('returns an array of objects containing `word` and `count` properties', () => {
      const topRankedWord = service.rank(wordMap, 1);
      expect(Array.isArray(topRankedWord)).toBe(true);
      expect(topRankedWord[0]).toHaveProperty('word');
      expect(topRankedWord[0]).toHaveProperty('count');
    });

    it('takes a map of word counts as its first argument', () => {
      const topRankedWord = service.rank(wordMap, 1);
      expect(topRankedWord).toBeDefined();
    });

    it('takes an optional second argument count which will default to 5', () => {
      const spyGetTop = jest.spyOn(
        LeaderBoardService.prototype as any,
        'getTop',
      );
      service.rank(wordMap);
      expect(spyGetTop).toHaveBeenNthCalledWith(1, 5);
      service.rank(wordMap, 10);
      expect(spyGetTop).toHaveBeenNthCalledWith(2, 10);
    });

    it('will return the top ranked words and if there is a tie in last place, it will include those words as well', () => {
      const results = service.rank(wordMap, 1);
      expect(results.length).toBe(2);
      expect(results).toEqual(
        expect.arrayContaining([
          { word: 'world', count: 25 },
          { word: 'hello', count: 25 },
        ]),
      );

      const results2 = service.rank(wordMap, 3);
      expect(results2.length).toBe(3);

      const results3 = service.rank(wordMap, 4);
      expect(results3.length).toBe(5);
      expect(results3).toEqual(
        expect.arrayContaining([
          { word: 'world', count: 25 },
          { word: 'hello', count: 25 },
          { word: 'funny', count: 13 },
          { word: 'laughing', count: 8 },
          { word: 'laughter', count: 8 },
        ]),
      );
    });
  });
});
