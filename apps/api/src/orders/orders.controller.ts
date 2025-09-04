import { Controller, Post, Body, Req } from '@nestjs/common';
import { OrdersService } from './orders.service.js';
import { z } from 'zod';
import { Request } from 'express';

const EgiftSchema = z.object({ eventId: z.string(), amountEur: z.number().int() });

@Controller('orders')
export class OrdersController {
  constructor(private readonly service: OrdersService) {}

  @Post('egift')
  createEgift(@Req() req: Request, @Body() body: any) {
    const { eventId, amountEur } = EgiftSchema.parse(body);
    const userId = req.headers['x-user-id'] as string;
    return this.service.createEgift(userId, eventId, amountEur);
    }
}
