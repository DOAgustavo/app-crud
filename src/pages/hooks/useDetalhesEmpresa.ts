import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { excluirEmpresa } from "../../services/empresaService";

// Interface que define a estrutura dos dados de uma empresa.
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

export function useDetalhesEmpresa() {
  // Estado para armazenar os dados da empresa.
  const [empresa, setEmpresa] = useState<Empresa | null>(null);

  // Estado para controlar o carregamento.
  const [loading, setLoading] = useState(true);

  // Hook do Next.js para acessar a rota e parâmetros da URL.
  const router = useRouter();
  const { id } = router.query; // Obtém o ID da empresa a partir da URL.

  // Efeito para buscar os dados da empresa ao carregar o componente ou quando o ID muda.
  useEffect(() => {
    if (!id) return; // Se o ID não estiver disponível, não faz nada.

    async function fetchEmpresa() {
      try {
        const response = await fetch(`/api/empresa/${id}`); // Faz a requisição para buscar os dados da empresa.
        if (!response.ok) {
          throw new Error("Erro ao buscar empresa"); // Lança um erro se a resposta não for bem-sucedida.
        }
        const data: Empresa = await response.json(); // Converte a resposta em JSON.
        setEmpresa(data); // Atualiza o estado com os dados da empresa.
      } catch (error) {
        console.error("Erro ao buscar empresa:", error); // Loga o erro no console.
        setEmpresa(null); // Define a empresa como `null` em caso de erro.
      } finally {
        setLoading(false); // Finaliza o estado de carregamento.
      }
    }

    fetchEmpresa(); // Chama a função para buscar os dados da empresa.
  }, [id]); // Dependência do efeito: será executado sempre que o ID mudar.

  // Função para excluir a empresa.
  const excluirEmpresaHandler = async () => {
    const confirm = window.confirm("Tem certeza que deseja excluir esta empresa?");
    // Exibe uma confirmação para o usuário antes de excluir.
    if (!confirm) return; // Se o usuário cancelar, não faz nada.

    try {
      await excluirEmpresa(Number(id)); // Chama o serviço para excluir a empresa.
      alert("Empresa excluída com sucesso!"); // Exibe uma mensagem de sucesso.
      router.push("/"); // Redireciona para a página inicial após a exclusão.
    } catch (error) {
      console.error("Erro ao excluir empresa:", error); // Loga o erro no console.
      alert("Erro ao excluir a empresa."); // Exibe uma mensagem de erro para o usuário.
    }
  };

  // Retorna os dados e funções para serem usados no componente.
  return { empresa, loading, excluirEmpresaHandler };
}