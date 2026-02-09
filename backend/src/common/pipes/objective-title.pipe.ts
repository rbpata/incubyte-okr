import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';

@Injectable()
export class ObjectiveTitlePipe implements PipeTransform<string, string> {
  transform(value: string): string {
    if (typeof value !== 'string') {
      throw new BadRequestException('Title must be a string');
    }

    const trimmed = value.trim();

    if (trimmed.length === 0) {
      throw new BadRequestException('Title cannot be empty');
    }

    if (trimmed.length < 5) {
      throw new BadRequestException('Title must be at least 5 characters long');
    }

    return trimmed;
  }
}
