import { useState, useEffect } from "react"; // Importa hooks do React para gerenciar estado e efeitos colaterais.

interface Licenca {
  id: number; // ID único da licença.
  numero: string; // Número da licença.
  orgaoAmbiental: string; // Órgão ambiental responsável.
  emissao: string; // Data de emissão da licença.
  validade: string; // Data de validade da licença.
  empresa: {
    id: number; // ID da empresa associada.
    razaoSocial: string; // Razão social da empresa.
  };
}

export function useLicencas(empresaId?: number) {
  const [licencas, setLicencas] = useState<Licenca[]>([]); // Estado para armazenar as licenças.
  const [loading, setLoading] = useState(true); // Estado para controlar o carregamento.
  const [error, setError] = useState<string | null>(null); // Estado para armazenar mensagens de erro.

  // Função para buscar licenças
  useEffect(() => {
    async function fetchLicencas() {
      try {
        // Faz uma requisição GET para buscar as licenças, com filtro opcional por empresaId.
        const response = await fetch(`/api/licenca${empresaId ? `?empresaId=${empresaId}` : ""}`);
        if (!response.ok) {
          throw new Error("Erro ao buscar licenças"); // Lança erro se a resposta não for bem-sucedida.
        }
        const data = await response.json(); // Converte a resposta para JSON.
        setLicencas(data); // Atualiza o estado com as licenças carregadas.
      } catch (err) {
        setError("Erro ao carregar licenças"); // Define mensagem de erro no estado.
      } finally {
        setLoading(false); // Finaliza o estado de carregamento.
      }
    }

    fetchLicencas(); // Chama a função ao montar o componente ou quando empresaId mudar.
  }, [empresaId]); // Dependência para reexecutar o efeito quando empresaId mudar.

  // Função para excluir uma licença
  const excluirLicenca = async (id: number) => {
    try {
      // Faz uma requisição DELETE para excluir a licença pelo ID.
      const response = await fetch(`/api/licenca/${id}`, { method: "DELETE" });
      if (!response.ok) {
        throw new Error("Erro ao excluir licença"); // Lança erro se a exclusão falhar.
      }
      // Remove a licença excluída do estado local.
      setLicencas((prevLicencas) => prevLicencas.filter((licenca) => licenca.id !== id));
    } catch (err) {
      alert("Erro ao excluir licença"); // Exibe alerta em caso de erro.
    }
  };

  // Retorna os dados e funções para o componente que usar o hook.
  return { licencas, loading, error, excluirLicenca };
}