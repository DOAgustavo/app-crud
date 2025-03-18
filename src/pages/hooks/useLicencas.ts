import { useState, useEffect } from "react";

// Define a interface para o tipo `Licenca`, que representa os dados de uma licença.
interface Licenca {
  id: number;
  numero: string;
  orgaoAmbiental: string;
  emissao: string;
  validade: string;
}

// Define o hook customizado `useLicencas`, que gerencia o carregamento e exclusão de licenças.
export function useLicencas(empresaId: string | string[] | undefined) {
  // Estado para armazenar a lista de licenças.
  const [licencas, setLicencas] = useState<Licenca[]>([]);
  // Estado para controlar o carregamento dos dados.
  const [loading, setLoading] = useState(true);
  // Estado para armazenar mensagens de erro, caso ocorram.
  const [error, setError] = useState<string | null>(null);

  // Efeito que é executado quando o `empresaId` muda.
  useEffect(() => {
    if (empresaId) {
      // Faz uma chamada à API para buscar as licenças relacionadas à empresa.
      fetch(`/api/licenca?empresaId=${empresaId}`)
        .then((res) => {
          if (!res.ok) {
            // Lança um erro se a resposta da API não for bem-sucedida.
            throw new Error("Erro ao carregar licenças.");
          }
          return res.json(); // Converte a resposta para JSON.
        })
        .then((data) => {
          // Atualiza o estado com os dados das licenças recebidos da API.
          setLicencas(data);
          setLoading(false); // Define o estado de carregamento como concluído.
        })
        .catch((err) => {
          // Trata erros que possam ocorrer durante a chamada à API.
          console.error("Erro ao carregar licenças:", err);
          setError("Não foi possível carregar as licenças."); // Define a mensagem de erro.
          setLoading(false); // Define o estado de carregamento como concluído.
        });
    }
  }, [empresaId]); // O efeito é executado sempre que o `empresaId` muda.

  // Função para excluir uma licença.
  const excluirLicenca = (id: number) => {
    fetch(`/api/licenca/${id}`, { method: "DELETE" }) // Faz uma requisição DELETE para a API.
      .then((res) => {
        if (!res.ok) {
          // Lança um erro se a resposta da API não for bem-sucedida.
          throw new Error("Erro ao excluir licença.");
        }
        // Remove a licença excluída do estado local.
        setLicencas((prev) => prev.filter((licenca) => licenca.id !== id));
      })
      .catch((err) => {
        // Trata erros que possam ocorrer durante a exclusão.
        console.error("Erro ao excluir licença:", err);
        setError("Não foi possível excluir a licença."); // Define a mensagem de erro.
      });
  };

  // Retorna os dados e funções gerenciados pelo hook.
  return { licencas, loading, error, excluirLicenca };
}