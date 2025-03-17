import { PrismaClient } from '@prisma/client';
// Importa o cliente do Prisma para interagir com o banco de dados.

import { NextApiRequest, NextApiResponse } from 'next';
// Importa os tipos do Next.js para requisições e respostas HTTP.

const prisma = new PrismaClient();
// Instancia o cliente do Prisma para realizar operações no banco de dados.

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Função principal que lida com as requisições HTTP para a rota `/api/empresa`.

  if (req.method === 'POST') {
    // Verifica se o método da requisição é POST (criação de uma nova empresa).
    const { razaoSocial, cnpj, cep, cidade, estado, bairro, complemento } = req.body;
    // Desestrutura os dados enviados no corpo da requisição.

    try {
      const empresa = await prisma.empresa.create({
        data: {
          razaoSocial,
          cnpj,
          cep,
          cidade,
          estado,
          bairro,
          complemento,
        },
      });
      // Cria uma nova empresa no banco de dados com os dados fornecidos.

      res.status(201).json(empresa);
      // Retorna a empresa criada com o status HTTP 201 (Created).
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar empresa' });
      // Retorna um erro com o status HTTP 500 (Internal Server Error) em caso de falha.
    }
  } else if (req.method === 'GET') {
    // Verifica se o método da requisição é GET (listagem de empresas).
    try {
      const empresas = await prisma.empresa.findMany();
      // Busca todas as empresas no banco de dados.

      res.status(200).json(empresas);
      // Retorna a lista de empresas com o status HTTP 200 (OK).
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar empresas' });
      // Retorna um erro com o status HTTP 500 (Internal Server Error) em caso de falha.
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
    // Retorna um erro com o status HTTP 405 (Method Not Allowed) se o método não for suportado.
  }
}