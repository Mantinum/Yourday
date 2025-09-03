import { Module } from '@nestjs/common';
import { RecipientsController } from './recipients.controller.js';
import { RecipientsService } from './recipients.service.js';
import { PrismaService } from '../prisma.service.js';

@Module({
  controllers: [RecipientsController],
  providers: [RecipientsService, PrismaService],
})
export class RecipientsModule {}
