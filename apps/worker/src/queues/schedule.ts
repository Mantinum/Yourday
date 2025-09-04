import { Queue, Worker, JobsOptions } from 'bullmq';
import dayjs from 'dayjs';
import { getRepos } from '../../api/src/db/repo.factory';
import { RecommendationsService } from '../../api/src/recommendations/recommendations.service';
import { OrdersService } from '../../api/src/orders/orders.service';

const queue = new Queue('schedule');
const repos = getRepos();
const recoService = new RecommendationsService();
const orderService = new OrdersService();

export async function enqueueDaily() {
  // cron expression for 02:00 Europe/Paris
  // await queue.add('daily', {}, { repeat: { cron: '0 2 * * *', tz: 'Europe/Paris' } });
  console.log('cron 02:00 Europe/Paris -> would schedule J-3 jobs');
}

export async function scheduleForEvent(eventId: string, runDate: Date) {
  const jobId = `reco:${eventId}:${dayjs(runDate).format('YYYY-MM-DD')}`;
  const opts: JobsOptions = {
    jobId,
    attempts: 5,
    backoff: { type: 'exponential', delay: 1000 },
  };
  await queue.add('generate', { eventId }, opts);
  await repos.auditLog.create({ kind: 'JOB', message: `scheduled ${jobId}` });
}

export const worker = new Worker('schedule', async job => {
  const eventId = (job.data as any).eventId as string;
  const event = await repos.events.findById(eventId);
  if (!event) return;
  await recoService.generateForEvent(eventId);
  if (process.env.DEV_AUTO_EGIFT === 'true') {
    await orderService.createEgift(event.userId, eventId, event.budgetEur);
  }
  await repos.auditLog.create({ kind: 'JOB', message: `processed ${job.id}` });
});
