import { Injectable } from '@nestjs/common';

@Injectable()
export class OrdersService {
  createEgift() {
    return { id: 'order_1', status: 'created' };
  }
}
