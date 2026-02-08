import { HttpException, HttpStatus } from '@nestjs/common';

export class ObjectiveAlreadyExistsException extends HttpException {
  constructor(title: string) {
    super(
      `Objective with title "${title}" already exists`,
      HttpStatus.CONFLICT,
    );
  }
}
