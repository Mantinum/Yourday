import { NestFactory } from '@nestjs/core';
import { WorkerModule } from './worker.module.js';
import { enqueueDaily } from './queues/schedule.js';

async function bootstrap() {
  await NestFactory.createApplicationContext(WorkerModule);
  enqueueDaily();
}
bootstrap();
