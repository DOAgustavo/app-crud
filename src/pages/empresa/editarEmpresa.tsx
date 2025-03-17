"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import EmpresaForm from "../../componentes/EmpresaForm";
import { fetchEmpresa, updateEmpresa } from "../../services/empresaService";

export default function EditarEmpresa() {
  const [empresa, setEmpresa] = useState<{
    razaoSocial: string;
    cnpj: string;
    cep: string;
    cidade: string;
    estado: string;
    bairro: string;
    complemento: string;
  } | null>(null);

  const [loading, setLoading] = useState(true); // Estado para controlar o carregamento
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id || isNaN(Number(id))) return; // Verifica se o id é válido

    async function fetchData() {
      try {
        const data = await fetchEmpresa(Number(id)); // Converte o id para número
        setEmpresa(data); // Atualiza o estado com os dados da empresa
      } catch (error) {
        console.error("Erro ao buscar empresa:", error);
      } finally {
        setLoading(false); // Finaliza o carregamento
      }
    }

    fetchData();
  }, [id]);

  const handleSave = async () => {
    if (!empresa || !id || isNaN(Number(id))) return;

    try {
      await updateEmpresa(Number(id), empresa); // Converte o id para número
      alert("Empresa atualizada com sucesso!");
      router.push(`/empresa/detalhesEmpresa?id=${id}`); // Redireciona para os detalhes da empresa
    } catch (error) {
      console.error("Erro ao atualizar empresa:", error);
      alert("Erro ao atualizar empresa. Tente novamente.");
    }
  };

  const handleCancel = () => {
    router.push(`/empresa/detalhesEmpresa?id=${id}`); // Redireciona para os detalhes da empresa
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!empresa) return;

    setEmpresa({
      ...empresa,
      [e.target.name]: e.target.value,
    });
  };

  if (loading) {
    return <p>Carregando...</p>; // Exibe uma mensagem de carregamento enquanto os dados estão sendo buscados
  }

  if (!empresa) {
    return <p>Empresa não encontrada.</p>; // Exibe uma mensagem caso a empresa não seja encontrada
  }

  return (
    <div className="container my-3 p-3 bg-white rounded shadow-sm" style={{ maxWidth: "500px" }}>
      <h1 className="text-center">Editar Empresa</h1>
      <EmpresaForm empresa={empresa} onChange={handleChange} onSave={handleSave} onCancel={handleCancel} />
    </div>
  );
}