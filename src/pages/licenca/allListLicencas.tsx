import { useLicencas } from "../../hooks/useAllLicencas"; // Hook personalizado para buscar e gerenciar licenças.
import { useRouter } from "next/router"; // Hook do Next.js para manipular rotas e navegação.
import LicencaItem from "../../componentes/AllListaLicenca"; // Componente para renderizar cada item de licença.

export default function AllListLicencas() {
  // Hook personalizado que retorna as licenças, estado de carregamento, erros e função de exclusão.
  const { licencas, loading, error, excluirLicenca } = useLicencas(1); // Passa o `empresaId` como argumento.
  const router = useRouter(); // Instância do roteador para navegação.

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
      <h1 className="text-center mb-4">Lista de Todas as Licenças</h1>

      {/* Verifica se há licenças disponíveis */}
      {licencas.length === 0 ? (
        <p className="text-center">Nenhuma licença encontrada.</p> // Mensagem exibida se não houver licenças.
      ) : (
        <ul className="list-group">
          {/* Mapeia as licenças e renderiza cada uma usando o componente LicencaItem */}
          {licencas.map((licenca) => (
            <LicencaItem
              key={licenca.id} // Define uma chave única para cada item.
              licenca={licenca} // Passa os dados da licença como propriedade.
              onEditar={(id) => router.push(`/licenca/editarLicenca?id=${id}`)} // Função para editar a licença.
              onExcluir={excluirLicenca} // Função para excluir a licença.
            />
          ))}
        </ul>
      )}
    </div>
  );
}