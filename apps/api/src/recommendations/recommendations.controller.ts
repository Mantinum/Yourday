import { Controller, Post } from '@nestjs/common';
import { RecommendationsService } from './recommendations.service.js';

@Controller('recommendations')
export class RecommendationsController {
  constructor(private readonly service: RecommendationsService) {}

  @Post('run')
  run() {
    return this.service.run();
  }
}
