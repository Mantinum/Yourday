import { Body, Controller, Post } from '@nestjs/common';
import { RecommendationsService } from './recommendations.service.js';
import { z } from 'zod';

const runSchema = z.object({ eventId: z.string() });

@Controller('recommendations')
export class RecommendationsController {
  constructor(private readonly recommendations: RecommendationsService) {}

  @Post('run')
  run(@Body() body: unknown) {
    const { eventId } = runSchema.parse(body);
    return this.recommendations.run(eventId);
  }
}
