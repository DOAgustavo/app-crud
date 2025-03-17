// npx ts-node --project tsconfig.scripts.json prisma/scripts/createEmpresas.ts
// Use o comando acima para executar o script no terminal do VS Code.

import { PrismaClient } from '@prisma/client';
// Importa o cliente do Prisma para interagir com o banco de dados.

const prisma = new PrismaClient();
// Instancia o cliente do Prisma para realizar operações no banco de dados.

async function main() {
  const empresas = [
    {
      razaoSocial: 'Empresa A',
      cnpj: '12345678000101',
      cep: '12345-678',
      cidade: 'São Paulo',
      estado: 'SP',
      bairro: 'Centro',
      complemento: 'Sala 101',
    },
    {
      razaoSocial: 'Empresa B',
      cnpj: '98765432000102',
      cep: '87654-321',
      cidade: 'Rio de Janeiro',
      estado: 'RJ',
      bairro: 'Copacabana',
      complemento: 'Apto 202',
    },
    {
      razaoSocial: 'Empresa C',
      cnpj: '45678912000103',
      cep: '54321-987',
      cidade: 'Belo Horizonte',
      estado: 'MG',
      bairro: 'Savassi',
      complemento: 'Loja 3',
    },
    {
      razaoSocial: 'Empresa D',
      cnpj: '78901234000104',
      cep: '65432-210',
      cidade: 'Curitiba',
      estado: 'PR',
      bairro: 'Batel',
      complemento: 'Conjunto 404',
    },
  ];
  // Define um array de objetos representando as empresas a serem cadastradas.

  for (const empresa of empresas) {
    // Itera sobre cada empresa definida no array.
    await prisma.empresa.create({
      data: empresa,
      // Cria a empresa no banco de dados com os dados fornecidos.
    });
  }

  console.log('Empresas cadastradas com sucesso!');
  // Exibe uma mensagem de sucesso no console após o cadastro das empresas.
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