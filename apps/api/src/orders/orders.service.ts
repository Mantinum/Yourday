import { Injectable } from '@nestjs/common';
import { getRepos } from '../db/repo.factory';

const repos = getRepos();

@Injectable()
export class OrdersService {
  async createEgift(userId: string, eventId: string, amountEur: number) {
    const order = await repos.orders.create({
      userId,
      eventId,
      kind: 'egift',
      amountEur,
      status: 'created',
      payload: { provider: 'incentives_stub' },
      createdAt: new Date().toISOString(),
    });
    await repos.auditLog.create({
      userId,
      kind: 'ORDER',
      message: `created egift for ${eventId}`,
    });
    return order;
  }
}
