import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
class ObjectiveTitlePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata): any {
    if (typeof value !== 'string') {
      throw new BadRequestException('Validation failed: value is not a string');
    }
    const trimmedValue = value.trim();
    if (trimmedValue.length === 0) {
      throw new BadRequestException('Validation failed: string is empty');
    }
    if (trimmedValue.length < 5) {
      throw new BadRequestException('Validation failed: string is too short');
    }

    return trimmedValue;
  }
}

export default ObjectiveTitlePipe;
