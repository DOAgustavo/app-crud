import Link from "next/link";

type AppBarProps = {
  searchTerm: string;
  onSearchChange: (value: string) => void;
};

export default function AppBar({ searchTerm, onSearchChange }: AppBarProps) {
  return (
    <div className="bg-dark py-3 mb-4">
      <div className="container">
        <div className="row align-items-center">
          {/* Coluna para o título do aplicativo */}
          <div className="col-12 col-md-4 text-center text-md-start mb-3 mb-md-0">
            <h1 className="text-white fs-4 fw-bold">app-CRUD</h1>
          </div>

          {/* Coluna para o campo de pesquisa */}
          <div className="col-12 col-md-4 mb-3 mb-md-0">
            <input
              type="text"
              placeholder="Pesquisar"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="form-control"
            />
          </div>

          {/* Coluna para os botões de criar nova empresa e nova licença */}
          <div className="col-12 col-md-4 d-flex flex-column flex-md-row justify-content-md-end gap-2">
            <Link href="/empresa/cadastroEmpresa" legacyBehavior>
              <a className="btn btn-primary">
                Nova Empresa
              </a>
            </Link>
            <Link href="/licenca/cadastroLicenca" legacyBehavior>
              <a className="btn btn-secondary">
                Nova Licença
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}