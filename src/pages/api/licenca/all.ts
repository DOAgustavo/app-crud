import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../prisma/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const { empresaId } = req.query;

    try {
      // Verifica se o parâmetro empresaId foi fornecido
      const licencas = empresaId
        ? await prisma.licenca.findMany({
            where: {
              empresaId: Number(empresaId), // Filtra pelo ID da empresa
            },
            include: {
              empresa: true, // Inclui os dados da empresa relacionada
            },
          })
        : await prisma.licenca.findMany({
            include: {
              empresa: true, // Inclui os dados da empresa relacionada
            },
          });

      // Retorna as licenças encontradas
      return res.status(200).json(licencas);
    } catch (error) {
      console.error("Erro ao buscar licenças:", error);
      return res.status(500).json({ error: "Erro ao buscar licenças" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ error: `Método ${req.method} não permitido` });
  }
}