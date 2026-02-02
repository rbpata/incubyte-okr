import { Injectable } from '@nestjs/common';

@Injectable()
export class ObjectiveService {
  getObjectives() {
    return {
      id: '1',
      objective: 'Increase Customer Satisfaction',
      keyResults: [
        {
          id: '1',
          description: 'Achieve a customer satisfaction score of 90%',
          progress: '70',
        },
        {
          id: '2',
          description: 'Reduce customer complaints by 20%',
          progress: '50',
        },
      ],
    };
  }
}
