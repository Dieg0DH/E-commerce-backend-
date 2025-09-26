import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const getDate = (): string => new Date().toLocaleString();

    const fullUrl = `${req.protocol}://${req.hostname}${req.originalUrl}`;

    console.log(`${req.method} ${fullUrl} - Request time:${getDate()}`);
    next();
  }
}
