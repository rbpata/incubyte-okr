import { HttpException, HttpStatus } from '@nestjs/common';

export class KeyResultNotFoundException extends HttpException {
  constructor(id: number) {
    super(`Key Result with id ${id} not found`, HttpStatus.NOT_FOUND);
  }
}
