import { useRouter } from "next/router";
import ExcluirButton from "./buttons/excluir"; // Botão de exclusão

interface EmpresaDetalhesProps {
  empresa: {
    id: number;
    razaoSocial: string;
    cnpj: string;
    cep: string;
    cidade: string;
    estado: string;
    bairro: string;
    complemento: string;
  };
  onExcluir: () => void; // Função para excluir a empresa
}

export default function EmpresaDetalhes({ empresa, onExcluir }: EmpresaDetalhesProps) {
  const router = useRouter();

  return (
    <div className="container my-3 p-3 bg-white rounded shadow-sm" style={{ maxWidth: "500px" }}>
      <h1 style={{ fontSize: "1.5rem", textAlign: "center" }}>Detalhes da Empresa</h1>
      <p><strong>Razão Social:</strong> {empresa.razaoSocial}</p>
      <p><strong>CNPJ:</strong> {empresa.cnpj}</p>
      <p><strong>CEP:</strong> {empresa.cep}</p>
      <p><strong>Cidade:</strong> {empresa.cidade}</p>
      <p><strong>Estado:</strong> {empresa.estado}</p>
      <p><strong>Bairro:</strong> {empresa.bairro}</p>
      <p><strong>Complemento:</strong> {empresa.complemento}</p>

      <div className="d-flex flex-wrap justify-between gap-2 mt-3">
        {/* Botão Cadastrar Licença */}
        <button
          className="btn btn-success"
          style={{ minWidth: "120px" }}
          onClick={() => router.push(`/licenca/cadastroLicenca?empresaId=${empresa.id}`)}
        >
          Cadastrar Licença
        </button>

        {/* Botão Editar */}
        <button
          className="btn btn-primary"
          style={{ minWidth: "120px" }}
          onClick={() => router.push(`/empresa/editarEmpresa?id=${empresa.id}`)}
        >
          Editar
        </button>

        {/* Botão Voltar */}
        <button
          className="btn btn-secondary"
          style={{ minWidth: "120px" }}
          onClick={() => router.push("/")}
        >
          Voltar
        </button>

        {/* Botão Excluir */}
        <ExcluirButton id={empresa.id} onExcluir={onExcluir} />
      </div>
    </div>
  );
}