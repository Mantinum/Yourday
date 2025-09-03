import { Injectable } from '@nestjs/common';

@Injectable()
export class RecommendationsService {
  run() {
    return { id: 'rec_1', items: [] };
  }
}
