import { NestFactory } from '@nestjs/core';
import dayjs from 'dayjs';
import { WorkerModule } from './worker.module.js';
import { enqueueDaily, scheduleForEvent } from './queues/schedule.js';
import { fakeRepo } from '../api/src/fake/fake-repo.js';

async function bootstrap() {
  await NestFactory.createApplicationContext(WorkerModule);
  if (process.env.DEMO_SEED_EVENTS === 'true') {
    const events = await fakeRepo.events.findAll(process.env.DEV_USER_ID || '');
    const target = dayjs().add(3, 'day').format('YYYY-MM-DD');
    for (const ev of events) {
      if (dayjs(ev.date).format('YYYY-MM-DD') === target) {
        await scheduleForEvent(ev.id, new Date(ev.date));
      }
    }
  }
  enqueueDaily();
}
bootstrap();
