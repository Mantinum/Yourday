import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
// import { createRemoteJWKSet, jwtVerify } from 'jose';

async function verifyToken(_token: string): Promise<string | null> {
  // TODO: implement verification against SUPABASE_JWKS_URL
  // const JWKS = createRemoteJWKSet(new URL(process.env.SUPABASE_JWKS_URL!));
  // const { payload } = await jwtVerify(token, JWKS);
  // return (payload as any).sub as string;
  return null;
}

@Injectable()
export class SupabaseJwtMiddleware implements NestMiddleware {
  async use(req: Request, _res: Response, next: NextFunction) {
    const auth = req.headers['authorization'];
    if (auth?.startsWith('Bearer ')) {
      const userId = await verifyToken(auth.slice(7));
      if (userId) {
        req.headers['x-user-id'] = userId;
      }
    }
    if (!req.headers['x-user-id']) {
      req.headers['x-user-id'] = 'dev-user';
    }
    next();
  }
}
