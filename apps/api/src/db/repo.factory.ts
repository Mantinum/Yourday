import { PrismaClient } from '@prisma/client';
import { createPrismaRepos } from './repo.prisma';
import { createFakeRepos } from './repo.fake';
import { Repos } from './repo.types';

let cached: Repos | null = null;

export function getRepos(): Repos {
  if (!cached) {
    if (process.env.OFFLINE_FAKE_DB === 'true') {
      cached = createFakeRepos();
    } else {
      const prisma = new PrismaClient();
      cached = createPrismaRepos(prisma);
    }
  }
  return cached;
}
