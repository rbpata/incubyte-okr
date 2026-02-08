import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Simple authentication check (for demonstration purposes)
    const authHeader = req.headers['authorization'];
    if (authHeader && authHeader === 'secretkey') {
      next();
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
  }
}
