import Link from 'next/link';

type AppBarProps = {
  searchTerm: string;
  onSearchChange: (value: string) => void;
};

export default function AppBar({ searchTerm, onSearchChange }: AppBarProps) {
  return (
    <div className="flex justify-between items-center px-4 py-2  bg-gray-800 mb-4"style={{
      gap: '16px', // Espaçamento entre os elementos
    }}>
      <div className="container text-center">
        <div className="row align-items-center">
          <div className="col">
            <h1 className="text-2xl font-bold text-white">app-CRUD</h1>
          </div>
          <div className="col">
            <input
              type="text"
              placeholder="Pesquisar"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="border p-2 rounded"
            />
          </div>
          <div className="col">
            <button type="button" className="btn btn-primary btn-sm">
              <Link href="/cadastros/cadastroEmpresa" legacyBehavior>
                <a className="bg-blue-500 text-white px-4 py-2 text-decoration-none rounded">Nova Empresa</a>
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}