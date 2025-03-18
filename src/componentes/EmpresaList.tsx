import React from "react";
import { useRouter } from "next/router";
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
    <div className="container mt-4">
      {/* Contêiner principal com margem superior */}
      <h2 className="text-center mb-4">Lista de Empresas</h2>
      {/* Título centralizado */}

      <ul className="list-group">
        {/* Lista de empresas */}
        {empresas.map((empresa) => (
          <li
            key={empresa.id}
            className="list-group-item list-group-item-action d-flex justify-content-between align-items-center mb-2"
            style={{ borderRadius: "10px" }}
            // Estiliza os itens da lista com bordas arredondadas e espaçamento inferior.
            onClick={() => onClick(empresa.id)}
            // Chama a função `onClick` ao clicar no item da lista.
          >
            <span>{empresa.razaoSocial}</span>
            {/* Exibe o nome da empresa */}
            
            {/* Botão para acessar os detalhes da empresa */}
          </li>
        ))}
      </ul>
    </div>
  );
}