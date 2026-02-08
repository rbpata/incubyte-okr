import { PipeTransform } from '@nestjs/common';

export class ObjectiveTitlePipe implements PipeTransform<string, string> {
  transform(value: string): string {
    if (typeof value !== 'string') {
      throw new Error('Title must be a string');
    }
    const trimmedValue = value.trim();
    if (trimmedValue.length < 5) {
      throw new Error('Title must be at least 5 characters long');
    }
    if (trimmedValue.length > 100) {
      throw new Error('Title must not exceed 100 characters');
    }
    return trimmedValue;
  }
}
