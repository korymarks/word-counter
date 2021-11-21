import { Test, TestingModule } from '@nestjs/testing';
import { WordCounterService } from './wordCounter.service';
import os from 'os';

describe('WordCounterService', () => {
  let service: WordCounterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WordCounterService],
    }).compile();

    service = await module.resolve<WordCounterService>(WordCounterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getWordCounts()', () => {
    it('has a public method named getWordCounts', () => {
      expect(service.getWordCounts).toBeDefined();
    });

    it('returns a map of the words (values as strings) and their respective count (keys as numbers)', () => {
      const text = 'What a great day!';
      service.countWords(text);
      const results = service.getWordCounts();
      expect(results instanceof Map).toBe(true);
      expect(typeof results.get('day')).toBe('number');
    });
  });

  describe('countWords()', () => {
    it('has a public method named countWords', () => {
      expect(service.countWords).toBeDefined();
    });

    it('removes extra spaces from the text', () => {
      const text = ' Hello  World ';
      service.countWords(text);
      const results = service.getWordCounts();
      expect(results.size).toBe(2);
    });

    describe('it removes puncutation from the string of text', () => {
      it('question marks', () => {
        const text = 'doing?';
        service.countWords(text);
        const results = service.getWordCounts();
        expect(results.size).toBe(1);
        expect(results.has('doing')).toBe(true);
        expect(results.has('?')).toBe(false);
      });

      it('question exclamation marks', () => {
        const text = 'wOw!';
        service.countWords(text);
        const results = service.getWordCounts();
        expect(results.size).toBe(1);
        expect(results.has('wow')).toBe(true);
        expect(results.has('!')).toBe(false);
      });

      it('periods', () => {
        const text = 'Hello.';
        service.countWords(text);
        const results = service.getWordCounts();
        expect(results.size).toBe(1);
        expect(results.has('hello')).toBe(true);
        expect(results.has('.')).toBe(false);
      });

      it('semicolons', () => {
        const text = 'Hello;';
        service.countWords(text);
        const results = service.getWordCounts();
        expect(results.size).toBe(1);
        expect(results.has('hello')).toBe(true);
        expect(results.has(';')).toBe(false);
      });

      it('colons', () => {
        const text = 'Hello:';
        service.countWords(text);
        const results = service.getWordCounts();
        expect(results.size).toBe(1);
        expect(results.has('hello')).toBe(true);
        expect(results.has(':')).toBe(false);
      });

      it('line breaks', () => {
        const text = `Hello${os.EOL}${os.EOL}`;
        service.countWords(text);
        const results = service.getWordCounts();
        expect(results.size).toBe(1);
        expect(results.has('hello')).toBe(true);
        expect(results.has(os.EOL)).toBe(false);
      });
    });

    it('will only store words in lower case', () => {
      const text = 'HEllO wORlD';
      service.countWords(text);
      const results = service.getWordCounts();
      expect(results.size).toBe(2);
      expect(results.has('hello')).toBe(true);
      expect(results.has('world')).toBe(true);
    });

    it('splits the string of text by a space', () => {
      const text = 'Hello World';
      service.countWords(text);
      const results = service.getWordCounts();
      expect(results.size).toBe(2);
    });

    it('stores the correct word count', () => {
      const text = 'HellO? hElLo;, world';
      service.countWords(text);
      const results = service.getWordCounts();
      expect(results.size).toBe(2);
      expect(results.get('hello')).toBe(2);
      expect(results.get('world')).toBe(1);
    });
  });
});
