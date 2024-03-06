import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Generate  100 clients
  const clients = Array.from({ length: 20 }, (_, i) => ({
    login: `Client ${i + 1}`,
    avatar: `https://cdn.intra.42.fr/users/3118dd117e3056f2110e5adc79ff68df/otait-ta.jpg`,
    email: `client${i}@gmail.com`,
  }));

  // Insert the clients into the database
  for (const client of clients) {
    await prisma.user.create({
      data: client,
    });
  }

  console.log('100 clients have been added to the database.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
