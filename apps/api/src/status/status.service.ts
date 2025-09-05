import { Injectable } from '@nestjs/common';
import { fakeRepo } from '../fake/fake-repo.js';

@Injectable()
export class StatusService {
  async getStatus() {
    const flags = {
      OFFLINE_FAKE_DB: process.env.OFFLINE_FAKE_DB === 'true',
      AMAZON_USE_FIXTURES: process.env.AMAZON_USE_FIXTURES === 'true',
    };

    const userId = process.env.DEV_USER_ID || '';
    const recipients = await fakeRepo.recipients.findAll(userId);
    const events = await fakeRepo.events.findAll(userId);
    const recommendations = await fakeRepo.recommendations.findAll(userId);
    const orders = await fakeRepo.orders.findAll(userId);

    return {
      db: false,
      fakeDb: true,
      counts: {
        users: 1,
        recipients: recipients.length,
        events: events.length,
        recommendations: recommendations.length,
        orders: orders.length,
      },
      flags,
    };
  }
}
