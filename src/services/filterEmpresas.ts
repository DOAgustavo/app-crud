import { Empresa } from '../componentes/EmpresaItem'; // Caminho ajustado

export function filterEmpresas(empresas: Empresa[], searchTerm: string): Empresa[] {
  return empresas.filter((empresa) =>
    empresa.razaoSocial.toLowerCase().includes(searchTerm.toLowerCase())
  );
}