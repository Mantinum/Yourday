import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service.js';
import { createPaymentIntent } from '../integrations/stripe.js';
import { sendEgift } from '../integrations/amazon/incentives.js';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async createEgift(eventId: string, amountEur: number) {
    const payment = await createPaymentIntent(amountEur);
    const order = await this.prisma.order.create({
      data: {
        userId: 'demo-user',
        eventId,
        kind: 'egift',
        amountEur,
        status: 'paid',
        providerId: payment.id,
      },
    });
    await sendEgift({ email: 'demo@example.com', amountEur });
    return order;
  }
}
