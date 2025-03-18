"use client";
// Indica que este componente será renderizado no lado do cliente (Next.js).

import { useDetalhesEmpresa } from "../../hooks/useDetalhesEmpresa";
// Hook customizado que encapsula a lógica de busca, exclusão e estado da empresa.


import EmpresaDetalhes from "../../componentes/DetalhesEmpresa";
// Componente para exibir os detalhes da empresa, incluindo a funcionalidade de exclusão.

export default function DetalhesEmpresa() {
  const { empresa, loading, excluirEmpresaHandler } = useDetalhesEmpresa();
  // Desestruturação do hook `useDetalhesEmpresa` para acessar os dados da empresa, estado de carregamento e função de exclusão.

  if (loading) return <p>Carregando...</p>;
  // Renderiza uma mensagem de carregamento enquanto os dados estão sendo buscados.

  if (!empresa) return <p>Empresa não encontrada.</p>;
  // Renderiza uma mensagem caso a empresa não seja encontrada.

  return (
    <>
      {/* Detalhes da Empresa */}
      <EmpresaDetalhes empresa={empresa} onExcluir={excluirEmpresaHandler} />
      {/* Componente que exibe os detalhes da empresa e permite a exclusão. */}

     
     
    </>
  );
}