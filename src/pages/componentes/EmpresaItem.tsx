import React from 'react';
import Link from 'next/link';

type Empresa = {
  id: number;
  razaoSocial: string;
  // Adicione outros campos conforme necessário
};

type EmpresaItemProps = {
  empresa: Empresa;
  onDelete: (id: number) => void;
};

const EmpresaItem: React.FC<EmpresaItemProps> = ({ empresa, onDelete }) => {
  return (
    <li className="border-b  py-2 d-flex justify-content-between align-items-center bg-white mb-3 px-3"style={{ borderRadius: '10px' }}>
      <span className="fs-3">{empresa.razaoSocial}</span>
      <div>
        {/* Link para editar a empresa */}
        <Link href={`/empresa/editar/${empresa.id}`} legacyBehavior>
          <a className="btn btn-secondary btn-sm bg-yellow-500 text-white px-4 py-2 rounded mr-2">Editar</a>
        </Link>
        {/* Botão para excluir a empresa */}
        <button
          onClick={() => onDelete(empresa.id)}
          type="button"
          className="btn btn-danger py-2 btn-sm"
        >
          Excluir
        </button>
      </div>
    </li>
  );
};

export default EmpresaItem;