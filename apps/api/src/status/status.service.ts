import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { getRepos } from '../db/repo.factory.js';

const repos = getRepos();

@Injectable()
export class StatusService {
  async getStatus() {
    const flags = {
      OFFLINE_FAKE_DB: process.env.OFFLINE_FAKE_DB === 'true',
      DEV_AUTO_EGIFT: process.env.DEV_AUTO_EGIFT === 'true',
      AMAZON_USE_FIXTURES: process.env.AMAZON_USE_FIXTURES === 'true',
    };

    const userId = process.env.DEV_USER_ID || '';
    const recipients = await repos.recipients.findAll(userId);
    const events = await repos.events.findAll(userId);
    const recommendations = await repos.recommendations.findAll(userId);
    const orders = await repos.orders.findAll(userId);
    const lastReco = recommendations[0]?.createdAt || null;
    const lastOrder = orders[0]?.createdAt || null;
    const lastJob = (await repos.auditLog.findLatest('JOB'))?.createdAt || null;

    let redis = false;
    if (process.env.REDIS_URL) {
      try {
        const r = new Redis(process.env.REDIS_URL);
        await r.ping();
        redis = true;
        r.disconnect();
      } catch {
        redis = false;
      }
    }

    return {
      db: !flags.OFFLINE_FAKE_DB,
      fakeDb: flags.OFFLINE_FAKE_DB,
      redis,
      counts: {
        users: 1,
        recipients: recipients.length,
        events: events.length,
        recommendations: recommendations.length,
        orders: orders.length,
      },
      last: {
        recommendation: lastReco,
        order: lastOrder,
        job: lastJob,
      },
      flags,
    };
  }
}
