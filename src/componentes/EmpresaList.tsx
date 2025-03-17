import React from 'react';
import { useRouter } from 'next/router';
// Importa o React e o hook `useRouter` do Next.js para manipular a navegação.

type Empresa = {
  id: number;
  razaoSocial: string;
};
// Define o tipo `Empresa` com as propriedades esperadas para cada empresa.

type EmpresaListProps = {
  empresas: Empresa[]; // Lista de empresas a ser exibida.
  onClick: (id: number) => void; // Função chamada ao clicar em uma empresa.
};
// Define as propriedades esperadas pelo componente `EmpresaList`.

export default function EmpresaList({ empresas, onClick }: EmpresaListProps) {
  const router = useRouter();
  // Instancia o hook `useRouter` para manipular a navegação.

  const handleClick = (id: number) => {
    // Redireciona para a página de detalhes da empresa.
    router.push(`/empresa/detalhesEmpresa?id=${id}`);
  };

  return (
    <div className="d-flex justify-content-center">
      {/* Centraliza a lista horizontalmente na página. */}
      <ul className="list-group" style={{ width: '80%' }}>
        {/* Define uma largura fixa para a lista. */}
        {empresas.map((empresa) => (
          <button
            key={empresa.id}
            className="list-group-item list-group-item-action mb-2"
            style={{ borderRadius: '10px' }}
            // Estiliza os itens da lista com bordas arredondadas e espaçamento inferior.
            onClick={() => onClick(empresa.id)}
            // Chama a função `onClick` ao clicar no item da lista.
          >
            {empresa.razaoSocial}
            {/* Exibe o nome da empresa no botão. */}
          </button>
        ))}
      </ul>
    </div>
  );
}