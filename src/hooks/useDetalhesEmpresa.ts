import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {  excluirEmpresa } from "../services/empresaService"; // Importa as funções do serviço
import { Empresa } from "../types/Empresa";
import { fetchEmpresa} from "../services/fetchEmpresas";

export function useDetalhesEmpresa() {
  const [empresa, setEmpresa] = useState<Empresa | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) return;

    async function loadEmpresa() {
      try {
        const data = await fetchEmpresa(id as string); // Usa a função do serviço
        setEmpresa(data);
      } catch (error) {
        console.error("Erro ao buscar empresa:", error);
        setEmpresa(null);
      } finally {
        setLoading(false);
      }
    }

    loadEmpresa();
  }, [id]);

  const excluirEmpresaHandler = async () => {
    const confirm = window.confirm("Tem certeza que deseja excluir esta empresa?");
    if (!confirm) return;

    try {
      await excluirEmpresa(Number(id)); // Usa a função do serviço
      alert("Empresa excluída com sucesso!");
      router.push("/");
    } catch (error) {
      console.error("Erro ao excluir empresa:", error);
      alert("Erro ao excluir a empresa.");
    }
  };

  return { empresa, loading, excluirEmpresaHandler };
}