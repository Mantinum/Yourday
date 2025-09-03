import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service.js';

@Injectable()
export class RecipientsService {
  constructor(private prisma: PrismaService) {}

  create(data: any) {
    return this.prisma.recipient.create({ data: { ...data, userId: 'demo-user' } });
  }

  findAll() {
    return this.prisma.recipient.findMany();
  }

  findOne(id: string) {
    return this.prisma.recipient.findUnique({ where: { id } });
  }

  update(id: string, data: any) {
    return this.prisma.recipient.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.prisma.recipient.delete({ where: { id } });
  }
}
