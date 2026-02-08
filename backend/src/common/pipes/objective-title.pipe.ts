import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';

@Injectable()
export class ObjectiveTitlePipe implements PipeTransform<
  { title?: unknown },
  string
> {
  transform(value: { title?: unknown }): string {
    if (!value || typeof value !== 'object') {
      throw new BadRequestException('Request body is invalid');
    }

    const title = value.title;

    if (typeof title !== 'string') {
      throw new BadRequestException('Title must be a string');
    }

    const trimmed = title.trim();

    if (trimmed.length === 0) {
      throw new BadRequestException('Title cannot be empty');
    }

    if (trimmed.length < 5) {
      throw new BadRequestException('Title must be at least 5 characters long');
    }

    return trimmed;
  }
}
