import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { RecommendationsService } from './recommendations.service.js';

@Controller('recommendations')
export class RecommendationsController {
  constructor(private readonly service: RecommendationsService) {}

  @Post('run')
  run(@Body('eventId') eventId: string) {
    return this.service.generateForEvent(eventId);
  }

  @Get()
  findByEvent(@Query('eventId') eventId: string) {
    return this.service.findByEvent(eventId);
  }
}
