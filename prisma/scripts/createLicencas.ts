// npx ts-node --project tsconfig.scripts.json prisma/scripts/createLicencas.ts
// use o codigo acima para rodar o script no terminal do vs code
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const licencas = [
    {
      numero: 'LIC001',
      orgaoAmbiental: 'IBAMA',
      emissao: new Date('2023-01-01'),
      validade: new Date('2025-01-01'),
    },
    {
      numero: 'LIC002',
      orgaoAmbiental: 'SEMA',
      emissao: new Date('2023-02-01'),
      validade: new Date('2025-02-01'),
    },
    {
      numero: 'LIC003',
      orgaoAmbiental: 'CETESB',
      emissao: new Date('2023-03-01'),
      validade: new Date('2025-03-01'),
    },
    {
      numero: 'LIC004',
      orgaoAmbiental: 'CONAMA',
      emissao: new Date('2023-04-01'),
      validade: new Date('2025-04-01'),
    },
    {
      numero: 'LIC005',
      orgaoAmbiental: 'ANVISA',
      emissao: new Date('2023-05-01'),
      validade: new Date('2025-05-01'),
    },
  ];

  // Cria 5 licenças para cada empresa com IDs de 1 a 4
  for (let empresaId = 1; empresaId <= 4; empresaId++) {
    for (const licenca of licencas) {
      await prisma.licenca.create({
        data: {
          ...licenca,
          empresaId, // Relaciona a licença com a empresa pelo ID
        },
      });
    }
  }

  console.log('Licenças criadas com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });