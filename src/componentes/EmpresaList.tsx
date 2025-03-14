type Empresa = {
  id: number;
  razaoSocial: string;
};

type EmpresaListProps = {
  empresas: Empresa[];
  onClick: (id: number) => void; // Função chamada ao clicar no botão
};

export default function EmpresaList({ empresas, onClick }: EmpresaListProps) {
  return (
    <div className="d-flex justify-content-center "> {/* Centraliza a lista */}
      <ul className="list-group" style={{ width: '80%' }}> {/* Define largura fixa */}
        {empresas.map((empresa) => (
          <button
            key={empresa.id}
            className="list-group-item list-group-item-action mb-2 "
            style={{ borderRadius: '10px' }}
            onClick={() => onClick(empresa.id)} // Chama a função ao clicar
          >
            {empresa.razaoSocial}
          </button>
        ))}
      </ul>
    </div>
  );
}