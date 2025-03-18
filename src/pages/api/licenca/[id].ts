import { NextApiRequest, NextApiResponse } from 'next'; // Tipos do Next.js para lidar com requisições e respostas HTTP.
import { prisma } from '../../../../prisma/prisma'; // Importa o Prisma Client para interagir com o banco de dados.

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query; // Obtém o ID da licença a partir da query string.

  // Valida se o ID é válido (não nulo e numérico).
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ error: 'ID da licença inválido' }); // Retorna erro 400 se o ID for inválido.
  }

  // Lida com o método HTTP PUT (atualizar licença).
  if (req.method === 'PUT') {
    const { numero, orgaoAmbiental, emissao, validade } = req.body; // Desestrutura os dados enviados no corpo da requisição.

    // Valida se todos os campos obrigatórios foram fornecidos.
    if (!numero || !orgaoAmbiental || !emissao || !validade) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios' }); // Retorna erro 400 se algum campo estiver ausente.
    }

    try {
      // Atualiza a licença no banco de dados com base no ID fornecido.
      const licencaAtualizada = await prisma.licenca.update({
        where: { id: Number(id) }, // Filtra pelo ID da licença.
        data: {
          numero,
          orgaoAmbiental,
          emissao: new Date(emissao), // Converte a data de emissão para o formato Date.
          validade: new Date(validade), // Converte a data de validade para o formato Date.
        },
      });

      // Retorna a licença atualizada com status 200 (OK).
      return res.status(200).json(licencaAtualizada);
    } catch (error) {
      console.error('Erro ao atualizar licença:', error); // Loga o erro no console para depuração.
      return res.status(500).json({ error: 'Erro ao atualizar licença' }); // Retorna erro 500 em caso de falha.
    }
  } 
  // Lida com o método HTTP GET (buscar licença por ID).
  else if (req.method === 'GET') {
    try {
      // Busca a licença no banco de dados com base no ID fornecido.
      const licenca = await prisma.licenca.findUnique({
        where: { id: Number(id) }, // Filtra pelo ID da licença.
      });

      // Verifica se a licença foi encontrada.
      if (!licenca) {
        return res.status(404).json({ error: 'Licença não encontrada' }); // Retorna erro 404 se a licença não existir.
      }

      // Retorna a licença encontrada com status 200 (OK).
      return res.status(200).json(licenca);
    } catch (error) {
      console.error('Erro ao buscar licença:', error); // Loga o erro no console para depuração.
      return res.status(500).json({ error: 'Erro ao buscar licença' }); // Retorna erro 500 em caso de falha.
    }
  } 
  // Lida com o método HTTP DELETE (excluir licença).
  else if (req.method === 'DELETE') {
    try {
      // Exclui a licença no banco de dados com base no ID fornecido.
      await prisma.licenca.delete({
        where: { id: Number(id) }, // Filtra pelo ID da licença.
      });

      // Retorna uma mensagem de sucesso com status 200 (OK).
      return res.status(200).json({ message: 'Licença excluída com sucesso' });
    } catch (error) {
      console.error('Erro ao excluir licença:', error); // Loga o erro no console para depuração.
      return res.status(500).json({ error: 'Erro ao excluir licença' }); // Retorna erro 500 em caso de falha.
    }
  } 
  // Lida com métodos HTTP não permitidos.
  else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']); // Define os métodos permitidos no cabeçalho da resposta.
    return res.status(405).json({ error: `Método ${req.method} não permitido` }); // Retorna erro 405 se o método não for permitido.
  }
}