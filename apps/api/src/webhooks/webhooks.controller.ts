import { Body, Controller, Post } from '@nestjs/common';

@Controller('webhooks')
export class WebhooksController {
  @Post('stripe')
  stripe(@Body() body: any) {
    return { received: true, id: body?.id };
  }
}
