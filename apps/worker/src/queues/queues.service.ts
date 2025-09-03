import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class QueuesService {
  private logger = new Logger(QueuesService.name);

  @Cron('0 2 * * *')
  handleCron() {
    this.logger.log('schedule check');
  }
}
