import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { QueuesService } from './queues/queues.service.js';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [QueuesService],
})
export class WorkerModule {}
