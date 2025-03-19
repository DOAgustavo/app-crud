import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { fetchEmpresa, updateEmpresa } from "../services/empresaService";
import { Empresa } from "../types/Empresa"; // Importa a interface Empresa

/**
 * Hook personalizado para buscar e gerenciar os dados de uma empresa.
 * 
 * @returns Objeto contendo os dados da empresa, estado de carregamento e função para atualizar a empresa.
 */
export const useEmpresa = () => {
  const [empresa, setEmpresa] = useState<Empresa | null>(null); // Estado para armazenar os dados da empresa
  const [loading, setLoading] = useState(true); // Estado para controlar o carregamento
  const router = useRouter();
  const { id } = router.query; // Obtém o ID da empresa a partir dos parâmetros da URL

  useEffect(() => {
    if (!id || isNaN(Number(id))) {
      setLoading(false);
      return;
    }

    async function fetchData() {
      try {
        const data = await fetchEmpresa(Number(id));
        setEmpresa(data);
      } catch (error) {
        console.error("Erro ao buscar empresa:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  const saveEmpresa = async () => {
    if (!empresa || !id || isNaN(Number(id))) return;

    try {
      await updateEmpresa(Number(id), empresa);
      alert("Empresa atualizada com sucesso!");
      router.push(`/empresa/detalhesEmpresa?id=${id}`);
    } catch (error) {
      console.error("Erro ao atualizar empresa:", error);
      alert("Erro ao atualizar empresa. Tente novamente.");
    }
  };

  return {
    empresa,
    setEmpresa,
    loading,
    saveEmpresa,
    cancel: () => router.push(`/empresa/detalhesEmpresa?id=${id}`),
  };
};