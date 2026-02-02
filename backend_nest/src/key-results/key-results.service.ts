import { Injectable } from '@nestjs/common';

@Injectable()
export class KeyResultsService {
  getKeyResults() {
    return [{ id: 1, name: 'Increase user engagement by 20%' }];
  }
}
