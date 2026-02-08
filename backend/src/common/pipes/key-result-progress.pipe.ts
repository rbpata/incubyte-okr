import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';

@Injectable()
export class KeyResultProgressPipe implements PipeTransform<unknown, number> {
  transform(value: unknown): number {
    const progress = Number(value);

    if (Number.isNaN(progress)) {
      throw new BadRequestException('Progress must be a number');
    }

    if (progress < 0 || progress > 100) {
      throw new BadRequestException('Progress must be between 0 and 100');
    }

    return progress;
  }
}
