import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { EventsService } from './events.service.js';
import { z } from 'zod';

const createSchema = z.object({
  recipientId: z.string(),
  type: z.string(),
  date: z.string(),
  leadDays: z.number().default(3),
  budgetEur: z.number(),
  notes: z.string().optional(),
});

@Controller('events')
export class EventsController {
  constructor(private readonly events: EventsService) {}

  @Post()
  create(@Body() body: unknown) {
    const data = createSchema.parse(body);
    return this.events.create(data);
  }

  @Get()
  findAll() {
    return this.events.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.events.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.events.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.events.remove(id);
  }
}
