/**
 * Busca os dados de uma empresa pelo ID.
 * @param empresaId - ID da empresa a ser buscada.
 * @returns Dados da empresa.
 */
export const fetchEmpresaData = async (empresaId: string) => {
  const response = await fetch(`/api/empresa/${empresaId}`);
  if (!response.ok) {
    throw new Error("Erro ao buscar empresa");
  }
  return response.json();
};

/**
 * Busca os dados de uma licença pelo ID.
 * @param licencaId - ID da licença a ser buscada.
 * @returns Dados da licença.
 */
export const fetchLicencaData = async (licencaId: string) => {
  const response = await fetch(`/api/licenca/${licencaId}`);
  if (!response.ok) {
    throw new Error("Erro ao buscar licença");
  }
  return response.json();
};

/**
 * Salva ou atualiza uma licença.
 * @param form - Dados do formulário da licença.
 * @param licencaId - (Opcional) ID da licença a ser atualizada.
 */
export const saveLicenca = async (form: any, licencaId?: string) => {
  const method = licencaId ? "PUT" : "POST";
  const endpoint = licencaId ? `/api/licenca/${licencaId}` : "/api/licenca";

  console.log("Dados enviados para a API:", form); // Log dos dados enviados

  const response = await fetch(endpoint, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  });

  if (!response.ok) {
    throw new Error("Erro ao salvar licença");
  }
};