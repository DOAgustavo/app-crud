import { NextApiRequest, NextApiResponse } from 'next';
// Importa os tipos do Next.js para requisições e respostas HTTP.

import { prisma } from '../../../../prisma/prisma';
// Importa o cliente do Prisma para interagir com o banco de dados.

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Função principal que lida com as requisições HTTP para a rota `/api/licenca`.

  if (req.method === 'POST') {
    // Verifica se o método da requisição é POST (criação de uma nova licença).
    const { numero, orgaoAmbiental, emissao, validade, empresaId } = req.body;
    // Desestrutura os dados enviados no corpo da requisição.

    if (!numero || !orgaoAmbiental || !emissao || !validade || !empresaId) {
      // Valida se todos os campos obrigatórios foram fornecidos.
      return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
      // Retorna um erro com o status HTTP 400 (Bad Request) se algum campo estiver ausente.
    }

    try {
      const novaLicenca = await prisma.licenca.create({
        data: {
          numero,
          orgaoAmbiental,
          emissao: new Date(emissao),
          validade: new Date(validade),
          empresaId: Number(empresaId),
        },
      });
      // Cria uma nova licença no banco de dados com os dados fornecidos.

      return res.status(201).json(novaLicenca);
      // Retorna a licença criada com o status HTTP 201 (Created).
    } catch (error) {
      console.error('Erro ao criar licença:', error);
      // Loga o erro no console para depuração.

      return res.status(500).json({ error: 'Erro ao criar licença' });
      // Retorna um erro com o status HTTP 500 (Internal Server Error) em caso de falha.
    }
  } else if (req.method === 'GET') {
    // Verifica se o método da requisição é GET (listagem de licenças).
    const { empresaId } = req.query;
    // Obtém o ID da empresa a partir dos parâmetros da URL.

    if (!empresaId || isNaN(Number(empresaId))) {
      // Valida se o ID da empresa é válido.
      return res.status(400).json({ error: 'ID da empresa inválido' });
      // Retorna um erro com o status HTTP 400 (Bad Request) se o ID for inválido.
    }

    try {
      const licencas = await prisma.licenca.findMany({
        where: { empresaId: Number(empresaId) },
      });
      // Busca todas as licenças associadas à empresa no banco de dados.

      return res.status(200).json(licencas);
      // Retorna a lista de licenças com o status HTTP 200 (OK).
    } catch (error) {
      console.error('Erro ao buscar licenças:', error);
      // Loga o erro no console para depuração.

      return res.status(500).json({ error: 'Erro ao buscar licenças' });
      // Retorna um erro com o status HTTP 500 (Internal Server Error) em caso de falha.
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    // Define os métodos HTTP permitidos para esta rota.

    return res.status(405).json({ error: `Método ${req.method} não permitido` });
    // Retorna um erro com o status HTTP 405 (Method Not Allowed) se o método não for suportado.
  }
}