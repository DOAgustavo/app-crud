import React from 'react';
import EmpresaItem from './EmpresaItem';

type Empresa = {
  id: number;
  razaoSocial: string;
  // Adicione outros campos conforme necessário
};

type EmpresaListProps = {
  empresas: Empresa[];
  onDelete: (id: number) => void;
};

const EmpresaList: React.FC<EmpresaListProps> = ({ empresas, onDelete }) => {
  return (
    <ul className="list-unstyled mt-4">
      {empresas.map((empresa) => (
        <EmpresaItem key={empresa.id} empresa={empresa} onDelete={onDelete} />
      ))}
    </ul>
  );
};

export default EmpresaList;