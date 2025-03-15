import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../prisma/prisma'; // Substitua pelo seu cliente de banco de dados

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

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
  } else if (req.method === 'PUT') {
    try {
      const updatedEmpresa = await prisma.empresa.update({
        where: { id: Number(id) },
        data: req.body,
      });

      res.status(200).json(updatedEmpresa);
    } catch (error) {
      console.error('Erro ao atualizar a empresa:', error);
      res.status(500).json({ error: 'Erro ao atualizar a empresa.' });
    }
  } else if (req.method === 'DELETE') {
    try {
      // Exclua a empresa do banco de dados
      const deletedEmpresa = await prisma.empresa.delete({
        where: { id: Number(id) }, // Certifique-se de que o ID seja um número
      });

      if (deletedEmpresa) {
        return res.status(200).json({ message: 'Empresa excluída com sucesso!' });
      } else {
        return res.status(404).json({ error: 'Empresa não encontrada.' });
      }
    } catch (error) {
      console.error('Erro ao excluir empresa:', error);
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}