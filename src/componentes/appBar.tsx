import Link from "next/link";
// Importa o componente `Link` do Next.js para navegação entre páginas.

type AppBarProps = {
  searchTerm: string; // Termo de pesquisa digitado pelo usuário.
  onSearchChange: (value: string) => void; // Função chamada ao alterar o valor do campo de pesquisa.
};
// Define as propriedades esperadas pelo componente `AppBar`.

export default function AppBar({ searchTerm, onSearchChange }: AppBarProps) {
  // Componente funcional que renderiza a barra de navegação.

  return (
    <div className="bg-dark py-3 mb-4">
      {/* Contêiner principal da barra de navegação */}
      <div className="container">
        <div className="row align-items-center">
          {/* Linha que organiza os elementos em colunas */}

          {/* Coluna para o título do aplicativo */}
          <div className="col-12 col-md-4 text-center text-md-start mb-3 mb-md-0">
            <h1 className="text-white fs-4 fw-bold">app-CRUD</h1>
            {/* Título do aplicativo com estilização */}
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
            {/* Campo de entrada para pesquisa com estilização */}
          </div>

          {/* Coluna para o botão de criar nova empresa */}
          <div className="col-12 col-md-4 text-center text-md-end">
            <Link href="/empresa/cadastroEmpresa" legacyBehavior>
              <a className="btn btn-primary">
                Nova Empresa
              </a>
            </Link>
            {/* Botão estilizado para criar uma nova empresa */}
          </div>
        </div>
      </div>
    </div>
  );
}