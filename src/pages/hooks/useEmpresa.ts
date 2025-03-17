import { useState, useEffect } from "react";
import { fetchEmpresa } from "../../services/empresaService"; // Importa o serviço para buscar empresa

interface Empresa  {
  id: number;
  razaoSocial: string;
  cnpj: string;
  cep: string;
  cidade: string;
  estado: string;
  bairro: string;
  complemento: string;
}

/**
 * Hook personalizado para buscar e gerenciar os dados de uma empresa.
 * 
 * @param id - ID da empresa a ser buscada.
 * @returns Objeto contendo os dados da empresa, estado de carregamento e função para atualizar a empresa.
 */
export const useEmpresa = (id: number | undefined) => {
  const [empresa, setEmpresa] = useState<Empresa | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id === undefined || typeof id !== "number") return; // Verifica se o id é válido

    async function loadEmpresa() {
      try {
        const data = await fetchEmpresa(id as number); // Garante ao TypeScript que id é um número
        setEmpresa(data); // Atualiza o estado com os dados da empresa
      } catch (error) {
        console.error("Erro ao buscar empresa:", error);
        setEmpresa(null); // Define como null em caso de erro
      } finally {
        setLoading(false); // Finaliza o estado de carregamento
      }
    }

    loadEmpresa();
  }, [id]);

  return { empresa, loading, setEmpresa }; // Retorna os dados da empresa, estado de carregamento e função para atualizar
};

function isNumber(value: any): value is number {
  return typeof value === "number";
}