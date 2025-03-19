import { NextApiRequest, NextApiResponse } from 'next'; // Tipos do Next.js para lidar com requisições e respostas HTTP.
import { prisma } from '../../../../prisma/prisma'; // Importa o Prisma Client para interagir com o banco de dados.

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Verifica o método HTTP da requisição.
  if (req.method === 'POST') {
    // Desestrutura os dados enviados no corpo da requisição.
    const { numero, orgaoAmbiental, emissao, validade, empresaId } = req.body;

    // Valida se todos os campos obrigatórios foram fornecidos.
    if (!numero || !orgaoAmbiental || !emissao || !validade || !empresaId) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios' }); // Retorna erro 400 se algum campo estiver ausente.
    }

    try {
      // Cria uma nova licença no banco de dados.
      const novaLicenca = await prisma.licenca.create({
        data: {
          numero,
          orgaoAmbiental,
          emissao: new Date(emissao), // Converte a data de emissão para o formato Date.
          validade: new Date(validade), // Converte a data de validade para o formato Date.
          empresaId: Number(empresaId), // Converte o ID da empresa para número.
        },
      });

      // Retorna a licença criada com status 201 (Created).
      return res.status(201).json(novaLicenca);
    } catch (error) {
      console.error('Erro ao criar licença:', error); // Loga o erro no console para depuração.

      // Retorna erro 500 (Internal Server Error) em caso de falha.
      return res.status(500).json({ error: 'Erro ao criar licença' });
    }
  } else if (req.method === 'GET') {
    // Obtém o parâmetro `empresaId` da query string.
    const { empresaId } = req.query;

    try {
      // Verifica se o `empresaId` foi fornecido.
      if (!empresaId) {
        return res.status(400).json({ error: 'O parâmetro empresaId é obrigatório' }); // Retorna erro 400 se o parâmetro estiver ausente.
      }

      // Busca as licenças no banco de dados filtradas pelo `empresaId`.
      const licencas = await prisma.licenca.findMany({
        where: {
          empresaId: Number(empresaId), // Filtra pelo ID da empresa.
        },
        include: {
          empresa: true, // Inclui os dados da empresa relacionada.
        },
      });

      // Retorna as licenças encontradas com status 200 (OK).
      res.status(200).json(licencas);
    } catch (error) {
      console.error('Erro ao buscar licenças:', error); // Loga o erro no console para depuração.

      // Retorna erro 500 (Internal Server Error) em caso de falha.
      res.status(500).json({ error: 'Erro ao buscar licenças' });
    }
  } else {
    // Define os métodos permitidos no cabeçalho da resposta.
    res.setHeader('Allow', ['GET', 'POST']);

    // Retorna erro 405 (Method Not Allowed) se o método HTTP não for permitido.
    return res.status(405).json({ error: `Método ${req.method} não permitido` });
  }
}
