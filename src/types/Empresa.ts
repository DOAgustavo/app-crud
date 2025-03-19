/**
 * Representa uma empresa no sistema.
 */
export interface Empresa {
  id: number; // Identificador único da empresa
  razaoSocial: string; // Nome oficial da empresa
  cnpj: string; // Cadastro Nacional da Pessoa Jurídica
  cep: string; // Código de Endereçamento Postal
  cidade: string; // Cidade onde a empresa está localizada
  estado: string; // Estado onde a empresa está localizada
  bairro: string; // Bairro onde a empresa está localizada
  complemento: string; // Complemento do endereço
}