import { useRouter } from "next/router";
import { useLicencas } from "../../hooks/useLicencas";
import LicencaItem from "../../componentes/ListaLicencas";
import { useState, useEffect } from "react";
import { getEmpresaById } from "../../services/empresaService"; // Função para buscar a empresa pelo ID

export default function ListaLicencas() {
  const router = useRouter();
  const { empresaId } = router.query;

  const { licencas, loading, error, excluirLicenca } = useLicencas(empresaId);

  const [razaoSocial, setRazaoSocial] = useState<string | null>(null);

  // Busca a razão social da empresa
  useEffect(() => {
    if (empresaId) {
      getEmpresaById(empresaId as string)
        .then((empresa) => setRazaoSocial(empresa.razaoSocial))
        .catch((err) => console.error("Erro ao buscar empresa:", err));
    }
  }, [empresaId]);

  if (loading) {
    return <p className="text-center">Carregando licenças...</p>;
  }

  if (error) {
    return <p className="text-center text-danger">{error}</p>;
  }

  return (
    <div className="container my-3 p-3 bg-white rounded shadow-sm" style={{ maxWidth: "800px" }}>
      <h1 className="text-center mb-4">Licenças da Empresa</h1>
      <p className="text-center">
        Exibindo licenças para a empresa: <strong>{razaoSocial || "Carregando..."}</strong>
      </p>

      {licencas.length === 0 ? (
        <p className="text-center">Nenhuma licença encontrada para esta empresa.</p>
      ) : (
        <ul className="list-group">
          {licencas.map((licenca) => (
            <LicencaItem
              key={licenca.id}
              licenca={licenca}
              onExcluir={excluirLicenca}
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
    </div>
  );
}