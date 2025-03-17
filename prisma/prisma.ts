import { PrismaClient } from '@prisma/client';
// Importa o cliente do Prisma para interagir com o banco de dados.

declare global {
  var prisma: PrismaClient | undefined;
}
// Declaração global para evitar múltiplas instâncias do Prisma em ambiente de desenvolvimento.

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ['query'], // Opcional: Habilita o log de consultas para facilitar a depuração.
  });
// Cria uma nova instância do PrismaClient ou reutiliza uma instância existente em ambiente de desenvolvimento.

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;
// Em ambiente de desenvolvimento, armazena a instância do Prisma no objeto global para evitar recriações.