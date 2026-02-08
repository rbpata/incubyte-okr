import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ObjectiveNotFoundException } from '../exceptions/objective-not-found.exception';
import { DuplicateObjectiveNotAllowedException } from '../exceptions/objective-not-allowed.exception';

@Catch(ObjectiveNotFoundException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: ObjectiveNotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response: Response = ctx.getResponse<Response>();

    response.status(HttpStatus.INTERNAL_SERVER_ERROR).send(exception);
  }
}

@Catch(DuplicateObjectiveNotAllowedException)
export class ObjectiveNotAllowedException implements ExceptionFilter {
  catch(exception: DuplicateObjectiveNotAllowedException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response: Response = ctx.getResponse<Response>();

    response.status(HttpStatus.CONFLICT).send(exception);
  }
}
