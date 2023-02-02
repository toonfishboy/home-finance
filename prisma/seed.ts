import { prisma } from '../src/server/db';

async function main() {
  await prisma.user.upsert({
    where: { email: 'toonvish@prisma.io' },
    update: {},
    create: {
      id: 'vishId',
      email: 'toonvish@prisma.io',
      userName: 'ToonVish',
    },
  });

  await prisma.user.upsert({
    where: { email: 'schafi@prisma.io' },
    update: {},
    create: {
      id: 'schafiId',
      email: 'schafi@prisma.io',
      userName: 'Schafi',
    },
  });

  const transactionId1 = 'transaction1';
  const transactionId2 = 'transaction2';

  await prisma.transaction.upsert({
    where: {
      id: transactionId1,
    },
    create: {
      id: transactionId1,
      date: '2023-01-15T11:27:07.000Z',
      amount: 22.1,
      userId: 'vishId',
    },
    update: {},
  });

  await prisma.transaction.upsert({
    where: {
      id: transactionId2,
    },
    create: {
      id: transactionId2,
      date: '2023-01-15T11:27:07.000Z',
      amount: 4546.2,
      userId: 'schafiId',
    },
    update: {},
  });

  const incomeId1 = 'income1';

  await prisma.income.upsert({
    where: {
      id: incomeId1,
    },
    create: {
      id: incomeId1,
      income: 2000.43,
      start: '2023-01-01T00:00:00.000Z',
      end: '2023-02-01T00:00:00.000Z',
      userId: 'vishId',
    },
    update: {},
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
