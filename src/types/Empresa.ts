/**
 * Define o tipo Empresa, que representa a estrutura de dados de uma empresa no sistema.
 * Esse tipo é usado para garantir consistência e tipagem em todo o projeto,
 * especialmente ao lidar com dados relacionados a empresas.
 */
export type Empresa = {
    id: number; // Identificador único da empresa
    razaoSocial: string; // Nome oficial da empresa
  };