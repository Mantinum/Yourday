import { Module } from '@nestjs/common';
import { RecipientsModule } from './recipients/recipients.module.js';
import { EventsModule } from './events/events.module.js';
import { RecommendationsModule } from './recommendations/recommendations.module.js';
import { OrdersModule } from './orders/orders.module.js';
import { WebhooksModule } from './webhooks/webhooks.module.js';

@Module({
  imports: [RecipientsModule, EventsModule, RecommendationsModule, OrdersModule, WebhooksModule],
})
export class AppModule {}
