import Link from 'next/link';
// Importa o componente `Link` do Next.js para navegação entre páginas.

type AppBarProps = {
  searchTerm: string; // Termo de pesquisa digitado pelo usuário.
  onSearchChange: (value: string) => void; // Função chamada ao alterar o valor do campo de pesquisa.
};
// Define as propriedades esperadas pelo componente `AppBar`.

export default function AppBar({ searchTerm, onSearchChange }: AppBarProps) {
  // Componente funcional que renderiza a barra de navegação.

  return (
    <div
      className="flex justify-between items-center px-4 py-2 bg-gray-800 mb-4"
      style={{
        gap: '16px', // Define o espaçamento entre os elementos.
      }}
    >
      {/* Contêiner principal da barra de navegação */}
      <div className="container text-center">
        <div className="row align-items-center">
          {/* Linha que organiza os elementos em colunas */}

          <div className="col">
            {/* Coluna para o título do aplicativo */}
            <h1 className="text-2xl font-bold text-white">app-CRUD</h1>
            {/* Título do aplicativo com estilização */}
          </div>

          <div className="col">
            {/* Coluna para o campo de pesquisa */}
            <input
              type="text"
              placeholder="Pesquisar"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="border p-2 rounded"
            />
            {/* Campo de entrada para pesquisa com estilização */}
          </div>

          <div className="col">
            {/* Coluna para o botão de criar nova empresa */}
            <button type="button" className="btn btn-primary btn-sm">
              <Link href="/empresa/cadastroEmpresa" legacyBehavior>
                {/* Link para a página de cadastro de nova empresa */}
                <a className="bg-blue-500 text-white px-4 py-2 text-decoration-none rounded">
                  Nova Empresa
                </a>
                {/* Botão estilizado para criar uma nova empresa */}
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}