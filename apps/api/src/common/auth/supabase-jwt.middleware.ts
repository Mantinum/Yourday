import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class SupabaseJwtMiddleware implements NestMiddleware {
  async use(req: Request, _res: Response, next: NextFunction) {
    // TODO: verify JWT against Supabase JWKS
    if (!req.headers['x-user-id']) {
      req.headers['x-user-id'] = 'dev-user';
    }
    next();
  }
}
