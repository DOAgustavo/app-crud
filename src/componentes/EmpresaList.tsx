import React from 'react';
import { useRouter } from 'next/router';


type Empresa = {
  id: number;
  razaoSocial: string;
  
};

type EmpresaListProps = {
  empresas: Empresa[];
  onClick: (id: number) => void; // Adiciona o onClick como propriedade
};

export default function EmpresaList({ empresas, onClick }: EmpresaListProps) {
  const router = useRouter();

  const handleClick = (id: number) => {
    // Redireciona para a página de detalhes da empresa
    router.push(`/empresa/detalhesEmpresa?id=${id}`);
  };

  return (
    <div className="d-flex justify-content-center"> {/* Centraliza a lista */}
      <ul className="list-group" style={{ width: '80%' }}> {/* Define largura fixa */}
        {empresas.map((empresa) => (
          <button
            key={empresa.id}
            className="list-group-item list-group-item-action mb-2"
            style={{ borderRadius: '10px' }}
            onClick={() => onClick(empresa.id)} // Chama o onClick ao clicar
          >
            {empresa.razaoSocial}
          </button>
        ))}
      </ul>
    </div>
  );
}