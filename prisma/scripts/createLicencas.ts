// npx ts-node --project tsconfig.scripts.json prisma/scripts/createLicencas.ts
// Comando para executar o script no terminal do VS Code usando o `ts-node`.

import { PrismaClient } from '@prisma/client';
// Importa o cliente do Prisma para interagir com o banco de dados.

const prisma = new PrismaClient();
// Instancia o cliente do Prisma para realizar operações no banco de dados.

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
  // Define um array de objetos representando as licenças a serem criadas.

  // Cria 5 licenças para cada empresa com IDs de 1 a 4.
  for (let empresaId = 1; empresaId <= 4; empresaId++) {
    // Itera sobre os IDs das empresas (de 1 a 4).
    for (const licenca of licencas) {
      // Itera sobre cada licença definida no array.
      await prisma.licenca.create({
        data: {
          ...licenca,
          empresaId, // Relaciona a licença com a empresa pelo ID.
        },
      });
      // Cria a licença no banco de dados associada à empresa.
    }
  }

  console.log('Licenças criadas com sucesso!');
  // Exibe uma mensagem de sucesso no console após a criação das licenças.
}

main()
  .catch((e) => {
    console.error(e);
    // Loga qualquer erro que ocorrer durante a execução do script.

    process.exit(1);
    // Encerra o processo com um código de erro.
  })
  .finally(async () => {
    await prisma.$disconnect();
    // Desconecta o cliente do Prisma do banco de dados.
  });