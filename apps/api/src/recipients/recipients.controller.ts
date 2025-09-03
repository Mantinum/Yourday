import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { RecipientsService } from './recipients.service.js';

@Controller('recipients')
export class RecipientsController {
  constructor(private readonly service: RecipientsService) {}

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
