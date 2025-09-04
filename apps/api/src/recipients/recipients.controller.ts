import { Controller, Get, Post, Body, Param, Put, Delete, Req } from '@nestjs/common';
import { RecipientsService } from './recipients.service.js';
import { RecipientCreateSchema } from '@yourday/shared/src/schemas';
import { Request } from 'express';

@Controller('recipients')
export class RecipientsController {
  constructor(private readonly service: RecipientsService) {}

  @Post()
  create(@Req() req: Request, @Body() body: any) {
    const dto = RecipientCreateSchema.parse(body);
    const userId = req.headers['x-user-id'] as string;
    return this.service.create(userId, dto);
  }

  @Get()
  findAll(@Req() req: Request) {
    const userId = req.headers['x-user-id'] as string;
    return this.service.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) {
    const dto = RecipientCreateSchema.partial().parse(body);
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
