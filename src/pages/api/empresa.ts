// filepath: src/pages/api/empresa.ts
import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { razaoSocial, cnpj, cep, cidade, estado, bairro, complemento } = req.body;
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
      res.status(201).json(empresa);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar empresa' });
    }
  } else if (req.method === 'GET') {
    try {
      const empresas = await prisma.empresa.findMany();
      res.status(200).json(empresas);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar empresas' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}