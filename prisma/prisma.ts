import { PrismaClient } from '@prisma/client';

// Evita criar múltiplas instâncias do Prisma em ambiente de desenvolvimento
declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ['query'], // Opcional: Log de consultas para depuração
  });

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;