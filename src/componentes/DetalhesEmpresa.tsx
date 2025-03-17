import { useRouter } from "next/router";
// Importa o hook `useRouter` do Next.js para manipular a navegação.

import ExcluirButton from "./buttons/excluir";
// Importa o componente de botão para exclusão.

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
  // Define a estrutura dos dados da empresa que serão exibidos.

  onExcluir: () => void;
  // Função para excluir a empresa.
}

export default function EmpresaDetalhes({ empresa, onExcluir }: EmpresaDetalhesProps) {
  const router = useRouter();
  // Instancia o hook `useRouter` para manipular a navegação.

  return (
    <div className="container my-3 p-3 bg-white rounded shadow-sm" style={{ maxWidth: "500px" }}>
      {/* Define o contêiner principal com estilização básica. */}
      <h1 style={{ fontSize: "1.5rem", textAlign: "center" }}>Detalhes da Empresa</h1>
      {/* Título da seção de detalhes. */}

      {/* Exibe os detalhes da empresa. */}
      <p><strong>Razão Social:</strong> {empresa.razaoSocial}</p>
      <p><strong>CNPJ:</strong> {empresa.cnpj}</p>
      <p><strong>CEP:</strong> {empresa.cep}</p>
      <p><strong>Cidade:</strong> {empresa.cidade}</p>
      <p><strong>Estado:</strong> {empresa.estado}</p>
      <p><strong>Bairro:</strong> {empresa.bairro}</p>
      <p><strong>Complemento:</strong> {empresa.complemento}</p>

      <div className="d-flex flex-wrap justify-between gap-2 mt-3">
        {/* Define um contêiner para os botões com espaçamento e layout flexível. */}

        {/* Botão para cadastrar uma nova licença. */}
        <button
          className="btn btn-success"
          style={{ minWidth: "120px" }}
          onClick={() => router.push(`/licenca/cadastroLicenca?empresaId=${empresa.id}`)}
        >
          Cadastrar Licença
        </button>

        {/* Botão para editar os dados da empresa. */}
        <button
          className="btn btn-primary"
          style={{ minWidth: "120px" }}
          onClick={() => router.push(`/empresa/editarEmpresa?id=${empresa.id}`)}
        >
          Editar
        </button>

        {/* Botão para voltar à página inicial. */}
        <button
          className="btn btn-secondary"
          style={{ minWidth: "120px" }}
          onClick={() => router.push("/")}
        >
          Voltar
        </button>

        {/* Botão para excluir a empresa. */}
        <ExcluirButton id={empresa.id} onExcluir={onExcluir} />
      </div>
    </div>
  );
}