import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service.js';
import { searchProducts } from '../integrations/amazon/paapi.js';

@Injectable()
export class RecommendationsService {
  constructor(private prisma: PrismaService) {}

  async run(eventId: string) {
    const products = await searchProducts({ query: 'gift' });
    return this.prisma.recommendation.create({
      data: {
        userId: 'demo-user',
        eventId,
        items: {
          create: products.map((p) => ({
            asin: p.asin,
            title: p.title,
            url: p.url,
            priceEur: p.priceEur,
            score: 1,
          })),
        },
      },
      include: { items: true },
    });
  }
}
