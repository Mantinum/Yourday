import { Controller, Post, Body } from '@nestjs/common';

@Controller('webhooks/stripe')
export class StripeController {
  @Post()
  handle(@Body() body: any) {
    console.log('stripe webhook', body);
    return { received: true };
  }
}
