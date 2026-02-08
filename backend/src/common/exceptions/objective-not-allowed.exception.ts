import { HttpException, HttpStatus } from '@nestjs/common';

export class ObjectiveNotAllowedException extends HttpException {
  constructor() {
    super(
      'You are not allowed to perform this action on the objective',
      HttpStatus.FORBIDDEN,
    );
  }
}
