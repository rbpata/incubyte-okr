import { HttpStatus, NestMiddleware } from '@nestjs/common';
import { Response } from 'express';
export class AuthMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: (error?: any) => void): any {
        const authHeader = req.headers['Authorization'] || '';
        if (authHeader) {
            if (authHeader === 'SECRET') {
                next();
            } else {
                return res
                    .status(HttpStatus.UNAUTHORIZED)
                    .send({ error: 'Unauthorized' });
            }
        }
    }
}
