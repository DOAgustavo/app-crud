import { NextApiRequest, NextApiResponse } from 'next';
import {prisma} from '../../../../prisma/prisma'; // Certifique-se de que o Prisma está configurado corretamente

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { numero, orgaoAmbiental, emissao, validade, empresaId } = req.body;

    if (!numero || !orgaoAmbiental || !emissao || !validade || !empresaId) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
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

      return res.status(201).json(novaLicenca);
    } catch (error) {
      console.error('Erro ao criar licença:', error);

      return res.status(500).json({ error: 'Erro ao criar licença' });
    }
  } else if (req.method === 'GET') {
    try {
      const licencas = await prisma.licenca.findMany({
        include: {
          empresa: true, // Inclui os dados da empresa relacionada
        },
      });
      res.status(200).json(licencas);
    } catch (error) {
      console.error('Erro ao buscar licenças:', error);
      res.status(500).json({ error: 'Erro ao buscar licenças' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).json({ error: `Método ${req.method} não permitido` });
  }
}