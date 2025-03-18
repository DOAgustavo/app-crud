import { useRouter } from "next/router"; // Hook do Next.js para acessar a rota e parâmetros da URL.
import { useLicencas } from "../../hooks/useLicencas"; // Hook personalizado para buscar licenças associadas a uma empresa.
import LicencaItem from "../../componentes/ListaLicencas"; // Componente para renderizar cada item de licença.
import { useState, useEffect } from "react"; // Hooks do React para gerenciar estado e efeitos colaterais.
import { getEmpresaById } from "../../services/empresaService"; // Serviço para buscar os detalhes de uma empresa pelo ID.

export default function ListaLicencas() {
  const router = useRouter(); // Instância do roteador para acessar parâmetros da URL e navegação.
  const { empresaId } = router.query; // Obtém o `empresaId` da query string da URL.

  // Hook personalizado para buscar licenças associadas à empresa.
  const { licencas, loading, error, excluirLicenca } = useLicencas(empresaId);

  // Estado para armazenar a razão social da empresa.
  const [razaoSocial, setRazaoSocial] = useState<string | null>(null);

  // Efeito para buscar a razão social da empresa com base no `empresaId`.
  useEffect(() => {
    if (empresaId) {
      getEmpresaById(empresaId as string) // Chama o serviço para buscar os detalhes da empresa.
        .then((empresa) => setRazaoSocial(empresa.razaoSocial)) // Define a razão social no estado.
        .catch((err) => console.error("Erro ao buscar empresa:", err)); // Loga erros no console.
    }
  }, [empresaId]); // Executa o efeito sempre que o `empresaId` mudar.

  // Exibe uma mensagem de carregamento enquanto os dados estão sendo buscados.
  if (loading) {
    return <p className="text-center">Carregando licenças...</p>;
  }

  // Exibe uma mensagem de erro caso ocorra algum problema ao buscar os dados.
  if (error) {
    return <p className="text-center text-danger">{error}</p>;
  }

  return (
    <div className="container my-3 p-3 bg-white rounded shadow-sm" style={{ maxWidth: "800px" }}>
      {/* Título da página */}
      <h1 className="text-center mb-4">Licenças da Empresa</h1>

      {/* Exibe a razão social da empresa ou uma mensagem de carregamento */}
      <p className="text-center">
        Exibindo licenças para a empresa: <strong>{razaoSocial || "Carregando..."}</strong>
      </p>

      {/* Verifica se há licenças associadas à empresa */}
      {licencas.length === 0 ? (
        <p className="text-center">Nenhuma licença encontrada para esta empresa.</p>
      ) : (
        <ul className="list-group">
          {/* Renderiza cada licença usando o componente LicencaItem */}
          {licencas.map((licenca) => (
            <LicencaItem
              key={licenca.id} // Define uma chave única para cada item.
              licenca={licenca} // Passa os dados da licença como propriedade.
              onExcluir={excluirLicenca} // Passa a função para excluir a licença.
            />
          ))}
        </ul>
      )}

      {/* Botão para voltar à página de detalhes da empresa */}
      <button
        className="btn btn-secondary mt-3"
        onClick={() => router.push(`/empresa/detalhesEmpresa?id=${empresaId}`)}
      >
        Voltar para Detalhes da Empresa
      </button>
    </div>
  );
}