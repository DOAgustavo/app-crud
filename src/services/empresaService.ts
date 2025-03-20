/**
 * A pasta `services` é responsável por centralizar a lógica de comunicação com a API.
 * 
 * Aqui são definidas funções reutilizáveis que encapsulam chamadas HTTP para endpoints específicos,
 * como criação, exclusão, atualização e busca de dados. Isso promove a separação de responsabilidades,
 * deixando os componentes e hooks focados apenas no gerenciamento de estado e lógica de interface.
 

/**
 * Função responsável por criar uma nova empresa na API.
 * 
 * Essa função faz uma requisição POST para o endpoint `/api/empresa` com os dados
 * fornecidos no formulário. Caso a requisição falhe, ela lança um erro.
 * 
 * @param {any} form - Objeto contendo os dados da empresa a serem enviados para a API.
 * @returns {Promise<any>} Retorna uma promessa que resolve para os dados da empresa criada.
 * @throws {Error} Lança um erro caso a requisição não seja bem-sucedida.
 */
export const createEmpresa = async (form: any) => {
  // Faz a requisição POST para o endpoint da API
  const response = await fetch('/api/empresa', {
    method: 'POST', // Define o método HTTP como POST
    headers: {
      'Content-Type': 'application/json', // Define o tipo de conteúdo como JSON
    },
    body: JSON.stringify(form), // Converte os dados do formulário para JSON
  });

  // Verifica se a resposta foi bem-sucedida
  if (!response.ok) {
    throw new Error('Erro ao criar empresa'); // Lança erro se a resposta não for bem-sucedida
  }

  return response.json(); // Retorna os dados da empresa criada
};





/**
 * Exclui uma empresa pelo ID.
 * @param empresaId - ID da empresa a ser excluída.
 */
export const excluirEmpresa = async (empresaId: number) => {
  const response = await fetch(`/api/empresa/${empresaId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Erro ao excluir a empresa.");
  }
};

/**
 * Exclui uma licença pelo ID.
 * @param licencaId - ID da licença a ser excluída.
 */
export const excluirLicenca = async (licencaId: number) => {
  const response = await fetch(`/api/licenca/${licencaId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Erro ao excluir a licença.");
  }
};


/**
 * Busca os dados de uma empresa pelo ID.
 * @param id - ID da empresa a ser buscada.
 * @returns Dados da empresa.
 */
export const fetchEmpresa = async (id: number) => {
  const response = await fetch(`/api/empresa/${id}`);
  if (!response.ok) {
    throw new Error("Erro ao buscar empresa");
  }
  return response.json();
};

/**
 * Atualiza os dados de uma empresa.
 * @param id - ID da empresa a ser atualizada.
 * @param data - Dados atualizados da empresa.
 * @returns Dados da empresa atualizada.
 */
export const updateEmpresa = async (id: number, data: any) => {
  const response = await fetch(`/api/empresa/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Erro ao salvar empresa");
  }

  return response.json();
};

/**
 * Busca os dados de uma empresa pelo ID.
 * @param id - ID da empresa a ser buscada.
 * @returns Dados da empresa.
 */
// filepath: c:\src\app-crud\src\services\empresaService.ts
import axios from "axios";

export async function getEmpresaById(id: string) {
  const response = await axios.get(`/api/empresa/${id}`);
  return response.data; // Certifique-se de que a API retorna um objeto com a propriedade `razaoSocial`
}

