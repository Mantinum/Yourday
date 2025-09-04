import { PrismaClient } from '@prisma/client';
import { Repos } from './repo.types';

export function createPrismaRepos(prisma: PrismaClient): Repos {
  return {
    recipients: {
      async create(data) {
        return prisma.recipient.create({ data });
      },
      async findAll(userId) {
        return prisma.recipient.findMany({ where: { userId } });
      },
      async findById(id) {
        return prisma.recipient.findUnique({ where: { id } });
      },
      async update(id, data) {
        return prisma.recipient.update({ where: { id }, data });
      },
      async remove(id) {
        await prisma.recipient.delete({ where: { id } });
      },
    },
    events: {
      async create(data) {
        return prisma.event.create({ data });
      },
      async findAll(userId) {
        return prisma.event.findMany({ where: { userId } });
      },
      async findById(id) {
        return prisma.event.findUnique({ where: { id }, include: { recipient: true } });
      },
      async update(id, data) {
        return prisma.event.update({ where: { id }, data });
      },
      async remove(id) {
        await prisma.event.delete({ where: { id } });
      },
    },
    recommendations: {
      async create(data, items) {
        return prisma.recommendation.create({
          data: {
            ...data,
            items: { createMany: { data: items } },
          },
          include: { items: true },
        });
      },
      async findByEvent(eventId) {
        return prisma.recommendation.findFirst({
          where: { eventId },
          orderBy: { createdAt: 'desc' },
          include: { items: true },
        });
      },
    },
    orders: {
      async create(data) {
        return prisma.order.create({ data });
      },
    },
    auditLog: {
      async create(data) {
        await prisma.auditLog.create({ data });
      },
    },
  };
}
