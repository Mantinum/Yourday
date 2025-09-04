import { PrismaClient } from '@prisma/client';
import dayjs from 'dayjs';

const prisma = new PrismaClient();

async function main() {
  if (process.env.OFFLINE_FAKE_DB === 'true') {
    console.log('Skipping seed: OFFLINE_FAKE_DB=true');
    return;
  }

  const userId = process.env.DEV_USER_ID || '00000000-0000-0000-0000-000000000001';

  await prisma.user.upsert({
    where: { id: userId },
    update: {},
    create: { id: userId, email: 'dev@yourday.test' },
  });

  const recipient1 = await prisma.recipient.upsert({
    where: { id: 'seed-rec-1' },
    update: {},
    create: {
      id: 'seed-rec-1',
      userId,
      fullName: 'Alice',
      interests: ['books', 'tech'],
      avoid: ['sports'],
    },
  });

  const recipient2 = await prisma.recipient.upsert({
    where: { id: 'seed-rec-2' },
    update: {},
    create: {
      id: 'seed-rec-2',
      userId,
      fullName: 'Bob',
      interests: ['games'],
      avoid: [],
    },
  });

  const event1 = await prisma.event.upsert({
    where: { id: 'seed-ev-1' },
    update: {},
    create: {
      id: 'seed-ev-1',
      userId,
      recipientId: recipient1.id,
      type: 'birthday',
      date: dayjs().add(10, 'day').toDate(),
      budgetEur: 25,
    },
  });

  const event2 = await prisma.event.upsert({
    where: { id: 'seed-ev-2' },
    update: {},
    create: {
      id: 'seed-ev-2',
      userId,
      recipientId: recipient2.id,
      type: 'birthday',
      date: dayjs().add(3, 'day').toDate(),
      budgetEur: 30,
    },
  });

  await prisma.recommendation.upsert({
    where: { id: 'seed-reco-1' },
    update: {},
    create: {
      id: 'seed-reco-1',
      userId,
      eventId: event1.id,
      items: {
        create: [
          {
            title: 'Demo product',
            url: 'https://example.com/product',
            priceEur: 20,
            score: 0.9,
          },
        ],
      },
    },
  });
}

main().finally(async () => {
  await prisma.$disconnect();
});
