import { type KeyResultCompletionDto } from './dto/key-result-completion.dto';

export class KeyResultCompletionService {
  isCompleted(keyResult: KeyResultCompletionDto) {
    return keyResult.progress === 100;
  }
}
