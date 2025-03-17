"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ListLicenca from "../../componentes/listLicenca"; // Componente para listar licenças
import EmpresaDetalhes from "../../componentes/DetalhesEmpresa"; // Novo componente para detalhes da empresa
import { excluirEmpresa } from "../../services/empresaService"; // Serviço para exclusão de empresas

interface Empresa {
  id: number;
  razaoSocial: string;
  cnpj: string;
  cep: string;
  cidade: string;
  estado: string;
  bairro: string;
  complemento: string;
}

export default function DetalhesEmpresa() {
  const [empresa, setEmpresa] = useState<Empresa | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) return;

    async function fetchEmpresa() {
      try {
        const response = await fetch(`/api/empresa/${id}`);
        if (!response.ok) {
          throw new Error("Erro ao buscar empresa");
        }
        const data: Empresa = await response.json();
        setEmpresa(data);
      } catch (error) {
        console.error("Erro ao buscar empresa:", error);
        setEmpresa(null);
      } finally {
        setLoading(false);
      }
    }

    fetchEmpresa();
  }, [id]);

  const handleExcluirEmpresa = async () => {
    const confirm = window.confirm("Tem certeza que deseja excluir esta empresa?");
    if (!confirm) return;

    try {
      await excluirEmpresa(Number(id)); // Chama o serviço para excluir a empresa
      alert("Empresa excluída com sucesso!");
      router.push("/"); // Redireciona para a página inicial
    } catch (error) {
      console.error("Erro ao excluir empresa:", error);
      alert("Erro ao excluir a empresa.");
    }
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (!empresa) {
    return <p>Empresa não encontrada.</p>;
  }

  return (
    <>
      {/* Detalhes da Empresa */}
      <EmpresaDetalhes empresa={empresa} onExcluir={handleExcluirEmpresa} />

      {/* Lista de Licenças */}
      <div>
        <ListLicenca empresaId={empresa.id} />
      </div>
    </>
  );
}