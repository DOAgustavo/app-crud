import { NextApiRequest, NextApiResponse } from 'next';
// Importa os tipos do Next.js para requisições e respostas HTTP.

import { prisma } from '../../../../prisma/prisma';
// Importa o cliente do Prisma para interagir com o banco de dados.

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Função principal que lida com as requisições HTTP para a rota `/api/licenca/[id]`.

  const { id } = req.query;
  // Obtém o ID da licença a partir dos parâmetros da URL.

  if (!id || isNaN(Number(id))) {
    // Valida se o ID da licença é válido.
    return res.status(400).json({ error: 'ID da licença inválido' });
    // Retorna um erro com o status HTTP 400 (Bad Request) se o ID for inválido.
  }

  if (req.method === 'GET') {
    // Verifica se o método da requisição é GET (obter detalhes de uma licença).
    try {
      const licenca = await prisma.licenca.findUnique({
        where: { id: Number(id) },
      });
      // Busca a licença no banco de dados pelo ID.

      if (!licenca) {
        // Verifica se a licença foi encontrada.
        return res.status(404).json({ error: 'Licença não encontrada' });
        // Retorna um erro com o status HTTP 404 (Not Found) se a licença não existir.
      }

      return res.status(200).json(licenca);
      // Retorna os detalhes da licença com o status HTTP 200 (OK).
    } catch (error) {
      console.error('Erro ao buscar licença:', error);
      // Loga o erro no console para depuração.

      return res.status(500).json({ error: 'Erro ao buscar licença' });
      // Retorna um erro com o status HTTP 500 (Internal Server Error) em caso de falha.
    }
  } else if (req.method === 'DELETE') {
    // Verifica se o método da requisição é DELETE (exclusão de uma licença).
    try {
      await prisma.licenca.delete({
        where: { id: Number(id) },
      });
      // Exclui a licença no banco de dados pelo ID.

      return res.status(200).json({ message: 'Licença excluída com sucesso' });
      // Retorna uma mensagem de sucesso com o status HTTP 200 (OK).
    } catch (error) {
      console.error('Erro ao excluir licença:', error);
      // Loga o erro no console para depuração.

      return res.status(500).json({ error: 'Erro ao excluir licença' });
      // Retorna um erro com o status HTTP 500 (Internal Server Error) em caso de falha.
    }
  } else {
    res.setHeader('Allow', ['GET', 'DELETE']);
    // Define os métodos HTTP permitidos para esta rota.

    return res.status(405).json({ error: `Método ${req.method} não permitido` });
    // Retorna um erro com o status HTTP 405 (Method Not Allowed) se o método não for suportado.
  }
}