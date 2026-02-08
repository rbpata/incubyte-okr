import { HttpException, HttpStatus } from '@nestjs/common';

export class ObjectiveNotFoundException extends HttpException {
  constructor(id: number) {
    super(`Objective with id ${id} not found`, HttpStatus.NOT_FOUND);
  }
}
