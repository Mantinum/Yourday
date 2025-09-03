import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { EventsService } from './events.service.js';

@Controller('events')
export class EventsController {
  constructor(private readonly service: EventsService) {}

  @Post()
  create(@Body() dto: any) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }
}
