/**
 * Este arquivo define a interface `Empresa`, que representa a estrutura de dados de uma empresa no sistema.
 * 
 * A interface é usada para tipar objetos relacionados a empresas, garantindo consistência e segurança
 * no uso de dados em diferentes partes do sistema, como componentes, hooks e serviços.
 
/**
 * Representa uma empresa no sistema.
 */
export interface Empresa {
  id: number; 
  razaoSocial: string; 
  cnpj: string; 
  cep: string; 
  cidade: string;
  estado: string; 
  bairro: string; 
  complemento: string; 
}