/**
 * Este arquivo define o hook `useLicencas`, responsável por gerenciar o estado e os efeitos
 * relacionados à busca e exclusão de licenças no sistema.
 * 
 * O hook realiza chamadas à API para buscar todas as licenças ou filtrar por uma empresa específica,
 * além de permitir a exclusão de licenças. Ele também gerencia os estados de carregamento e erro.
 */

import { useState, useEffect } from "react";
import { Licenca } from "../types/Licenca";

export function useLicencas(empresaId?: number) {
  const [licencas, setLicencas] = useState<Licenca[]>([]); // Estado para armazenar as licenças.
  const [loading, setLoading] = useState(true); // Estado para controlar o carregamento.
  const [error, setError] = useState<string | null>(null); // Estado para armazenar mensagens de erro.

  useEffect(() => {
    async function fetchLicencas() {
      try {
        // Define o endpoint com base no parâmetro empresaId
        const endpoint = empresaId ? `/api/licenca/all?empresaId=${empresaId}` : "/api/licenca/all";
        const response = await fetch(endpoint); // Faz a requisição para a API

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
      const response = await fetch(`/api/licenca/${id}`, { method: "DELETE" }); // Faz a requisição DELETE para a API
      if (!response.ok) {
        throw new Error("Erro ao excluir licença"); // Lança erro se a exclusão falhar.
      }
      // Remove a licença excluída do estado local
      setLicencas((prevLicencas) => prevLicencas.filter((licenca) => licenca.id !== id));
    } catch (err) {
      alert("Erro ao excluir licença"); // Exibe alerta em caso de erro.
    }
  };

  return { licencas, loading, error, excluirLicenca }; // Retorna os estados e a função excluirLicenca.
}