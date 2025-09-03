import { Body, Controller, Post } from '@nestjs/common';
import { OrdersService } from './orders.service.js';
import { z } from 'zod';

const schema = z.object({ eventId: z.string(), amountEur: z.number() });

@Controller('orders')
export class OrdersController {
  constructor(private readonly orders: OrdersService) {}

  @Post('egift')
  egift(@Body() body: unknown) {
    const data = schema.parse(body);
    return this.orders.createEgift(data.eventId, data.amountEur);
  }
}
