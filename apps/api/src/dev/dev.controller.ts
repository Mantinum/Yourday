import { Controller, Post } from '@nestjs/common';
import { fakeRepo } from '../fake/fake-repo.js';
import dayjs from 'dayjs';

@Controller('dev')
export class DevController {
  @Post('seed')
  seed() {
    if (process.env.OFFLINE_FAKE_DB !== 'true') {
      return { seeded: false };
    }
    const userId = '00000000-0000-0000-0000-000000000000';
    const recipient = fakeRepo.recipients.create({
      userId,
      fullName: 'Alice',
      interests: ['books'],
      avoid: [],
      createdAt: new Date().toISOString(),
    });
    const event = fakeRepo.events.create({
      userId,
      recipientId: recipient.id,
      type: 'birthday',
      date: dayjs().add(3, 'day').toISOString(),
      budgetEur: 30,
      createdAt: new Date().toISOString(),
    });
    fakeRepo.recommendations.create(
      { userId, eventId: event.id, createdAt: new Date().toISOString() },
      [
        {
          title: 'Demo product',
          url: 'https://example.com',
          priceEur: 20,
          score: 0.5,
        },
      ],
    );
    return { seeded: true };
  }
}
