import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
class AuthMiddleware implements NestMiddleware {
  use(req: Request, _res: Response, next: NextFunction) {
    const authToken = req.headers.authorization;

    if (!authToken) {
      throw new UnauthorizedException('Authorization token missing');
    }

    if (authToken !== process.env.AUTH_TOKEN) {
      throw new UnauthorizedException('Invalid authorization token');
    }
    next();
  }
}

export default AuthMiddleware;
