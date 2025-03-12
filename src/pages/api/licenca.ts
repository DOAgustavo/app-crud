import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { numero, orgaoAmbiental, emissao, validade, empresaId } = req.body;
    try {
      const licenca = await prisma.licenca.create({
        data: {
          numero,
          orgaoAmbiental,
          emissao: new Date(emissao),
          validade: new Date(validade),
          empresaId,
        },
      });
      res.status(201).json(licenca);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar licença' });
    }
  } else if (req.method === 'GET') {
    try {
      const licencas = await prisma.licenca.findMany();
      res.status(200).json(licencas);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar licenças' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}