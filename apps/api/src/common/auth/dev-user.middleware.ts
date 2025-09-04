import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class DevUserMiddleware implements NestMiddleware {
  use(req: Request, _res: Response, next: NextFunction) {
    if (process.env.OFFLINE_FAKE_DB === 'true') {
      const devId = req.headers['x-user-id'] as string | undefined;
      req.headers['x-user-id'] = devId || '00000000-0000-0000-0000-000000000000';
    }
    next();
  }
}
