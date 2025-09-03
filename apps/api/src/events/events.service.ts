import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service.js';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  create(data: any) {
    return this.prisma.event.create({ data: { ...data, userId: 'demo-user' } });
  }

  findAll() {
    return this.prisma.event.findMany();
  }

  findOne(id: string) {
    return this.prisma.event.findUnique({ where: { id } });
  }

  update(id: string, data: any) {
    return this.prisma.event.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.prisma.event.delete({ where: { id } });
  }
}
