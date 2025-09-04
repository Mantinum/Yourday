import { Controller, Get, Header } from '@nestjs/common';
import { StatusService } from './status.service.js';

const env = process.env.CI ? 'ci' : 'dev';

@Controller()
export class StatusController {
  constructor(private readonly service: StatusService) {}

  @Get('health')
  @Header('X-Env', env)
  health() {
    return { status: 'ok', time: new Date().toISOString(), tz: 'Europe/Paris' };
  }

  @Get('status')
  @Header('X-Env', env)
  status() {
    return this.service.getStatus();
  }
}
