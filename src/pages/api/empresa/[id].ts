/**
 * Este arquivo define a API para manipulação de uma empresa específica.
 * 
 * Ele lida com requisições HTTP para a rota `/api/empresa/[id]`, permitindo:
 * - **GET**: Obter os detalhes de uma empresa pelo ID.
 * - **PUT**: Atualizar os dados de uma empresa pelo ID.
 * - **DELETE**: Excluir uma empresa pelo ID.
 */

import { NextApiRequest, NextApiResponse } from 'next';
// Importa os tipos do Next.js para requisições e respostas HTTP.

import { prisma } from '../../../../prisma/prisma';
// Importa o cliente do Prisma para interagir com o banco de dados.

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Função principal que lida com as requisições HTTP para a rota `/api/empresa/[id]`.

  const { id } = req.query;
  // Obtém o ID da empresa a partir dos parâmetros da URL.

  if (!id || isNaN(Number(id))) {
    // Valida se o ID da empresa é válido.
    return res.status(400).json({ error: 'ID inválido' });
    // Retorna um erro com o status HTTP 400 (Bad Request) se o ID for inválido.
  }

  if (req.method === 'GET') {
    // Verifica se o método da requisição é GET (obter detalhes de uma empresa).
    try {
      const empresa = await prisma.empresa.findUnique({
        where: { id: Number(id) },
      });
      // Busca a empresa no banco de dados pelo ID.

      if (!empresa) {
        // Verifica se a empresa foi encontrada.
        return res.status(404).json({ error: 'Empresa não encontrada' });
        // Retorna um erro com o status HTTP 404 (Not Found) se a empresa não existir.
      }

      res.status(200).json(empresa);
      // Retorna os detalhes da empresa com o status HTTP 200 (OK).
    } catch (error) {
      console.error('Erro ao buscar empresa:', error);
      // Loga o erro no console para depuração.

      res.status(500).json({ error: 'Erro ao buscar empresa' });
      // Retorna um erro com o status HTTP 500 (Internal Server Error) em caso de falha.
    }
  } else if (req.method === 'PUT') {
    // Verifica se o método da requisição é PUT (atualizar os dados de uma empresa).
    try {
      const updatedEmpresa = await prisma.empresa.update({
        where: { id: Number(id) },
        data: req.body,
      });
      // Atualiza os dados da empresa no banco de dados com os dados fornecidos no corpo da requisição.

      res.status(200).json(updatedEmpresa);
      // Retorna os dados atualizados da empresa com o status HTTP 200 (OK).
    } catch (error) {
      console.error('Erro ao atualizar a empresa:', error);
      // Loga o erro no console para depuração.

      res.status(500).json({ error: 'Erro ao atualizar a empresa.' });
      // Retorna um erro com o status HTTP 500 (Internal Server Error) em caso de falha.
    }
  } else if (req.method === 'DELETE') {
    // Verifica se o método da requisição é DELETE (exclusão de uma empresa).
    try {
      const deletedEmpresa = await prisma.empresa.delete({
        where: { id: Number(id) },
      });
      // Exclui a empresa no banco de dados pelo ID.

      if (deletedEmpresa) {
        // Verifica se a exclusão foi bem-sucedida.
        return res.status(200).json({ message: 'Empresa excluída com sucesso!' });
        // Retorna uma mensagem de sucesso com o status HTTP 200 (OK).
      } else {
        return res.status(404).json({ error: 'Empresa não encontrada.' });
        // Retorna um erro com o status HTTP 404 (Not Found) se a empresa não existir.
      }
    } catch (error) {
      console.error('Erro ao excluir empresa:', error);
      // Loga o erro no console para depuração.

      return res.status(500).json({ error: 'Erro interno do servidor.' });
      // Retorna um erro com o status HTTP 500 (Internal Server Error) em caso de falha.
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    // Define os métodos HTTP permitidos para esta rota.

    res.status(405).end(`Method ${req.method} Not Allowed`);
    // Retorna um erro com o status HTTP 405 (Method Not Allowed) se o método não for suportado.
  }
}