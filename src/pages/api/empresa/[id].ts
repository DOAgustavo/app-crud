import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  // Verifica se o ID é válido
  if (!id || isNaN(Number(id))) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  if (req.method === 'GET') {
    try {
      const empresa = await prisma.empresa.findUnique({
        where: { id: Number(id) },
      });

      if (!empresa) {
        return res.status(404).json({ error: 'Empresa não encontrada' });
      }

      res.status(200).json(empresa);
    } catch (error) {
      console.error('Erro ao buscar empresa:', error);
      res.status(500).json({ error: 'Erro ao buscar empresa' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}