/**
 * Função responsável por buscar a lista de empresas da API.
 * 
 * Essa função faz uma requisição para o endpoint `/api/empresa` e retorna os dados
 * em formato JSON. Caso ocorra algum erro durante a requisição ou se a resposta
 * não for válida, a função retorna um array vazio e exibe o erro no console.
 * 
 * @returns {Promise<any[]>} Retorna uma promessa que resolve para um array de empresas.
 */
export async function fetchEmpresas() {
  try {
    // Faz a requisição para o endpoint da API
    const response = await fetch('/api/empresa');

    // Verifica se a resposta foi bem-sucedida
    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status}`); // Lança erro se a resposta não for válida
    }

    // Converte a resposta para JSON
    const data = await response.json();

    // Valida se o retorno é um array
    if (!Array.isArray(data)) {
      throw new Error('Resposta da API não é um array válido.');
    }

    return data; // Retorna os dados da API
  } catch (error) {
    // Exibe o erro no console para facilitar o debug
    console.error('Erro ao buscar empresas:', error);

    // Retorna um array vazio em caso de erro
    return [];
  }
}

import { Empresa } from "../types/Empresa";

/**
 * Busca os dados de uma empresa pelo ID.
 * @param id - ID da empresa a ser buscada.
 * @returns Dados da empresa.
 */
export const fetchEmpresa = async (id: string): Promise<Empresa> => {
  const response = await fetch(`/api/empresa/${id}`);
  if (!response.ok) {
    throw new Error("Erro ao buscar empresa");
  }
  return response.json();
};