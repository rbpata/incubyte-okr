import { Injectable } from '@nestjs/common';
import { KeyResultDto } from './dto/key-result.dto';

export interface KeyResult {
  id: string;
  description: string;
  progress: string;
  isCompleted: boolean;
}

@Injectable()
export class KeyResultsService {
  private keyResults = [
    {
      id: '1',
      description: 'Increase customer satisfaction score to 90%',
      progress: '70',
      isCompleted: false,
    },
  ];

  getAll() {
    return this.keyResults;
  }
  create(createKeyResultDto: KeyResultDto): KeyResult {
    const createdItem: KeyResult = {
      id: crypto.randomUUID(),
      description: createKeyResultDto.description,
      progress: createKeyResultDto.progress,
      isCompleted: false,
    };

    this.keyResults.push(createdItem);
    return createdItem;
  }
}
