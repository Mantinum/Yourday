import { Injectable } from '@nestjs/common';
import { fakeRepo } from '../fake/fake-repo.js';

@Injectable()
export class OrdersService {
  async createEgift(userId: string, eventId: string, amountEur: number) {
    const order = await fakeRepo.orders.create({
      userId,
      eventId,
      kind: 'egift',
      amountEur,
      status: 'created',
      payload: { provider: 'incentives_stub' },
      createdAt: new Date().toISOString(),
    });
    await fakeRepo.auditLog.create({
      userId,
      kind: 'ORDER',
      message: `created egift for ${eventId}`,
    });
    return order;
  }
}
