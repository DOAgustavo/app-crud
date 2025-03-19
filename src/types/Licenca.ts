/**
 * Representa uma empresa no sistema.
 */
export interface Empresa {
    id: number; // Identificador único da empresa
    razaoSocial: string; // Nome oficial da empresa
  }
  
  /**
   * Representa o estado do formulário de cadastro de licença.
   */
  export interface FormState {
    empresaId: string; // ID da empresa associada à licença
    numero: string; // Número da licença
    orgaoAmbiental: string; // Órgão ambiental responsável
    emissao: string; // Data de emissão da licença
    validade: string; // Data de validade da licença
  }
  
  /**
   * Representa uma licença no sistema.
   */
  export interface Licenca {
    id: number; // ID único da licença
    numero: string; // Número da licença
    orgaoAmbiental: string; // Órgão ambiental responsável
    emissao: string; // Data de emissão da licença
    validade: string; // Data de validade da licença
    empresa: Empresa; // Dados da empresa associada à licença
  }

  // Define a interface para o formulário de licença.
export interface LicencaForm {
    numero: string; // Número da licença.
    orgaoAmbiental: string; // Órgão ambiental responsável.
    emissao: string; // Data de emissão da licença.
    validade: string; // Data de validade da licença.
  }
  