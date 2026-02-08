import { KeyResultCompletionService } from './key-result-completion.service';
import { KeyResultCompletionDto } from './dto/key-result-completion.dto';
import { Test } from '@nestjs/testing';

describe('KeyResultCompletionService', () => {
  let keyResultCompletionService: KeyResultCompletionService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [KeyResultCompletionService],
    }).compile();

    keyResultCompletionService = await moduleRef.resolve(
      KeyResultCompletionService,
    );
  });
  describe('isCompleted', () => {
    it('should return true if progress is 100', () => {
      const keyResult: KeyResultCompletionDto = {
        description: 'Test Key Result',
        progress: 100,
      };
      const result = keyResultCompletionService.isCompleted(keyResult);
      expect(result).toBeTruthy();
    });

    it('should return false if progress is less than 100', () => {
      const keyResult: KeyResultCompletionDto = {
        description: 'Test Key Result',
        progress: 75,
      };
      const result = keyResultCompletionService.isCompleted(keyResult);
      expect(result).toBeFalsy();
    });
  });
});
