// Importa o tipo Empresa para garantir que a função receba e retorne os dados no formato correto.
import { Empresa } from '../types/Empresa';

/**
 * Filtra uma lista de empresas com base em um termo de busca.
 * 
 * @param empresas - Lista de empresas a ser filtrada.
 * @param searchTerm - Termo de busca usado para filtrar as empresas.
 * @returns Uma nova lista contendo apenas as empresas cuja razão social inclui o termo de busca.
 */
export function filterEmpresas(empresas: Empresa[], searchTerm: string): Empresa[] {
  return empresas.filter((empresa) =>
    // Converte a razão social e o termo de busca para letras minúsculas
    // para garantir que a busca seja case-insensitive.
    empresa.razaoSocial.toLowerCase().includes(searchTerm.toLowerCase())
  );
}