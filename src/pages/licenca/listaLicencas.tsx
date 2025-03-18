import { useRouter } from "next/router";
// Importa o hook `useRouter` do Next.js para manipular a navegação.

import { useLicencas } from "../../pages/hooks/useLicencas";
// Importa o hook customizado `useLicencas` para gerenciar o carregamento e exclusão de licenças.

import LicencaItem from "../../componentes/ListaLicencas";
// Importa o componente `LicencaItem` para renderizar cada item da lista de licenças.

export default function ListaLicencas() {
  const router = useRouter();
  // Instancia o hook `useRouter` para acessar os parâmetros da URL e manipular a navegação.

  const { empresaId } = router.query;
  // Obtém o ID da empresa a partir dos parâmetros da URL.

  const { licencas, loading, error, excluirLicenca } = useLicencas(empresaId);
  // Usa o hook `useLicencas` para carregar as licenças, gerenciar o estado de carregamento e erros,
  // e fornecer a função para excluir licenças.

  if (loading) {
    // Exibe uma mensagem de carregamento enquanto os dados estão sendo buscados.
    return <p className="text-center">Carregando licenças...</p>;
  }

  if (error) {
    // Exibe uma mensagem de erro caso ocorra algum problema ao carregar os dados.
    return <p className="text-center text-danger">{error}</p>;
  }

  return (
    <div className="container my-3 p-3 bg-white rounded shadow-sm" style={{ maxWidth: "800px" }}>
      {/* Contêiner principal com estilização básica */}
      <h1 className="text-center mb-4">Licenças da Empresa</h1>
      {/* Título da página */}
      <p className="text-center">
        Exibindo licenças para a empresa com ID: <strong>{empresaId}</strong>
      </p>
      {/* Mensagem informativa com o ID da empresa */}

      {licencas.length === 0 ? (
        // Caso não existam licenças, exibe uma mensagem informativa.
        <p className="text-center">Nenhuma licença encontrada para esta empresa.</p>
      ) : (
        // Caso existam licenças, renderiza a lista de licenças.
        <ul className="list-group">
          {licencas.map((licenca) => (
            // Para cada licença, renderiza o componente `LicencaItem`.
            <LicencaItem
              key={licenca.id}
              licenca={licenca}
              onExcluir={excluirLicenca}
              // Passa a função `excluirLicenca` como prop para o componente.
            />
          ))}
        </ul>
      )}

      <button
        className="btn btn-secondary mt-3"
        onClick={() => router.push(`/empresa/detalhesEmpresa?id=${empresaId}`)}
      >
        Voltar para Detalhes da Empresa
      </button>
      {/* Botão para voltar à página de detalhes da empresa */}
    </div>
  );
}