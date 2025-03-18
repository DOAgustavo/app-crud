import { useState, useEffect } from "react";
import { useRouter } from "next/router";

interface Licenca {
  id: number;
  numero: string;
  orgaoAmbiental: string;
  emissao: string;
  validade: string;
  empresa: {
    id: number;
    razaoSocial: string;
  };
}

export default function AllListLicencas() {
  const [licencas, setLicencas] = useState<Licenca[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Função para buscar todas as licenças
  useEffect(() => {
    async function fetchLicencas() {
      try {
        const response = await fetch("/api/licencas"); // Endpoint para buscar todas as licenças
        if (!response.ok) {
          throw new Error("Erro ao buscar licenças");
        }
        const data = await response.json();
        setLicencas(data);
      } catch (err) {
        setError("Erro ao carregar licenças");
      } finally {
        setLoading(false);
      }
    }

    fetchLicencas();
  }, []);

  // Função para excluir uma licença
  const excluirLicenca = async (id: number) => {
    try {
      const response = await fetch(`/api/licencas/${id}`, { method: "DELETE" });
      if (!response.ok) {
        throw new Error("Erro ao excluir licença");
      }
      setLicencas((prevLicencas) => prevLicencas.filter((licenca) => licenca.id !== id));
    } catch (err) {
      alert("Erro ao excluir licença");
    }
  };

  if (loading) {
    return <p className="text-center">Carregando licenças...</p>;
  }

  if (error) {
    return <p className="text-center text-danger">{error}</p>;
  }

  return (
    <div className="container my-3 p-3 bg-white rounded shadow-sm" style={{ maxWidth: "800px" }}>
      <h1 className="text-center mb-4">Lista de Todas as Licenças</h1>
      {licencas.length === 0 ? (
        <p className="text-center">Nenhuma licença encontrada.</p>
      ) : (
        <ul className="list-group">
          {licencas.map((licenca) => (
            <li
              key={licenca.id}
              className="list-group-item d-flex justify-content-between align-items-center mb-2"
              style={{ borderRadius: "10px" }}
            >
              <div>
                <p><strong>Número:</strong> {licenca.numero}</p>
                <p><strong>Órgão Ambiental:</strong> {licenca.orgaoAmbiental}</p>
                <p><strong>Emissão:</strong> {new Date(licenca.emissao).toLocaleDateString()}</p>
                <p><strong>Validade:</strong> {new Date(licenca.validade).toLocaleDateString()}</p>
                <p><strong>Empresa:</strong> {licenca.empresa.razaoSocial}</p>
              </div>
              <div className="d-flex gap-2">
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => router.push(`/licenca/editarLicenca?id=${licenca.id}`)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => excluirLicenca(licenca.id)}
                >
                  Excluir
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}