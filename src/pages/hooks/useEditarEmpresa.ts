import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { fetchEmpresa, updateEmpresa } from "../../services/empresaService";

interface Empresa {
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
 * @returns Objeto contendo os dados da empresa, estado de carregamento e função para atualizar a empresa.
 */
export const useEmpresa = () => {
  const [empresa, setEmpresa] = useState<Empresa | null>(null);
  // Estado para armazenar os dados da empresa.

  const [loading, setLoading] = useState(true);
  // Estado para controlar o carregamento.

  const router = useRouter();
  const { id } = router.query;
  // Obtém o ID da empresa a partir dos parâmetros da URL.

  useEffect(() => {
    if (!id || isNaN(Number(id))) {
      // Verifica se o ID é válido. Se não for, finaliza o carregamento.
      setLoading(false);
      return;
    }

    async function fetchData() {
      // Função para buscar os dados da empresa.
      try {
        const data = await fetchEmpresa(Number(id));
        // Busca os dados da empresa pelo ID.

        setEmpresa(data);
        // Atualiza o estado com os dados da empresa.
      } catch (error) {
        console.error("Erro ao buscar empresa:", error);
        // Loga o erro no console em caso de falha.
      } finally {
        setLoading(false);
        // Finaliza o estado de carregamento.
      }
    }

    fetchData();
    // Chama a função para buscar os dados da empresa.
  }, [id]);
  // Dependência do efeito: será executado sempre que o ID mudar.

  const saveEmpresa = async () => {
    // Função para salvar as alterações na empresa.
    if (!empresa || !id || isNaN(Number(id))) return;
    // Verifica se os dados da empresa e o ID são válidos.

    try {
      await updateEmpresa(Number(id), empresa);
      // Atualiza os dados da empresa no backend.

      alert("Empresa atualizada com sucesso!");
      // Exibe uma mensagem de sucesso.

      router.push(`/empresa/detalhesEmpresa?id=${id}`);
      // Redireciona para a página de detalhes da empresa.
    } catch (error) {
      console.error("Erro ao atualizar empresa:", error);
      // Loga o erro no console em caso de falha.

      alert("Erro ao atualizar empresa. Tente novamente.");
      // Exibe uma mensagem de erro para o usuário.
    }
  };

  return {
    empresa, // Dados da empresa.
    setEmpresa, // Função para atualizar o estado da empresa.
    loading, // Estado de carregamento.
    saveEmpresa, // Função para salvar as alterações na empresa.
    cancel: () => router.push(`/empresa/detalhesEmpresa?id=${id}`),
    // Função para cancelar e redirecionar para os detalhes da empresa.
  };
};

/**
 * Função utilitária para verificar se um valor é um número.
 * 
 * @param value Valor a ser verificado.
 * @returns Retorna `true` se o valor for um número, caso contrário, `false`.
 */
function isNumber(value: any): value is number {
  return typeof value === "number";
}