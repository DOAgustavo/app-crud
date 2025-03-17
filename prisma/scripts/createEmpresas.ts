import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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

  for (const empresa of empresas) {
    await prisma.empresa.create({
      data: empresa,
    });
  }

  console.log('Empresas cadastradas com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });