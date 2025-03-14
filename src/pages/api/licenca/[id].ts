import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../prisma/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ error: 'ID da licença inválido' });
  }

  if (req.method === 'GET') {
    try {
      const licenca = await prisma.licenca.findUnique({
        where: { id: Number(id) },
      });

      if (!licenca) {
        return res.status(404).json({ error: 'Licença não encontrada' });
      }

      return res.status(200).json(licenca);
    } catch (error) {
      console.error('Erro ao buscar licença:', error);
      return res.status(500).json({ error: 'Erro ao buscar licença' });
    }
  } else if (req.method === 'DELETE') {
    try {
      await prisma.licenca.delete({
        where: { id: Number(id) },
      });

      return res.status(200).json({ message: 'Licença excluída com sucesso' });
    } catch (error) {
      console.error('Erro ao excluir licença:', error);
      return res.status(500).json({ error: 'Erro ao excluir licença' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'DELETE']);
    return res.status(405).json({ error: `Método ${req.method} não permitido` });
  }
}