import { Controller, Post } from '@nestjs/common';
import { OrdersService } from './orders.service.js';

@Controller('orders')
export class OrdersController {
  constructor(private readonly service: OrdersService) {}

  @Post('egift')
  createEgift() {
    return this.service.createEgift();
  }
}
