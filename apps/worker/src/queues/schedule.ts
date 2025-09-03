import { Queue } from 'bullmq';

const queue = new Queue('schedule');

export function setupScheduleCron() {
  console.log('cron 02:00 Europe/Paris -> would schedule J-3 jobs');
  // TODO: ensure idempotence and DLQ handling
}
