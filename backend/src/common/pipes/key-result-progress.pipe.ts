import { BadRequestException, PipeTransform } from '@nestjs/common';

export class KeyResultProgressPipe implements PipeTransform<unknown, number> {
  transform(value: unknown): number {
    const progress = Number(value);
    if (Number.isNaN(progress)) {
      throw new BadRequestException('Progress must be a Number');
    }
    if (progress < 0 || progress >= 100) {
      throw new BadRequestException(
        'Progress must be a positive number between 0 to 100',
      );
    }
    return progress;
  }
}
