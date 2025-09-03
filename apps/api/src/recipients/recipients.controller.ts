import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { RecipientsService } from './recipients.service.js';
import { z } from 'zod';

const createSchema = z.object({
  fullName: z.string(),
  birthday: z.string().optional(),
});

@Controller('recipients')
export class RecipientsController {
  constructor(private readonly recipients: RecipientsService) {}

  @Post()
  create(@Body() body: unknown) {
    const data = createSchema.parse(body);
    return this.recipients.create(data);
  }

  @Get()
  findAll() {
    return this.recipients.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recipients.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.recipients.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recipients.remove(id);
  }
}
