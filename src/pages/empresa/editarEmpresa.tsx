import { useState } from "react";
import { useRouter } from "next/router";
import EmpresaForm from "../../componentes/EmpresaForm"; // Componente reutilizável para o formulário de empresa
import { useEmpresa } from "../hooks/useEmpresa"; // Hook personalizado
import { updateEmpresa } from "../../services/empresaService"; // Serviço para atualizar empresa

export default function EditarEmpresa() {
  const router = useRouter();
  const { id } = router.query;

  const { empresa, loading, setEmpresa } = useEmpresa(Number(id)); // Usa o hook para buscar a empresa
  const [editForm, setEditForm] = useState(empresa); // Estado para os dados editáveis

  // Atualiza os dados do formulário conforme o usuário edita os campos
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditForm((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  // Salva as alterações feitas no formulário
  const handleSave = async () => {
    if (!editForm) return;

    try {
      const updatedEmpresa = await updateEmpresa(editForm.id, editForm); // Atualiza a empresa no back-end
      setEmpresa(updatedEmpresa); // Atualiza o estado com os dados salvos
      alert("Empresa atualizada com sucesso!");
      router.push(`/empresa/detalhesEmpresa?id=${editForm.id}`); // Redireciona para a página de detalhes
    } catch (error) {
      console.error("Erro ao salvar empresa:", error);
      alert("Erro ao salvar empresa. Tente novamente.");
    }
  };

  // Exibe uma mensagem de carregamento enquanto os dados estão sendo buscados
  if (loading) {
    return <p>Carregando...</p>;
  }

  // Exibe uma mensagem caso a empresa não seja encontrada
  if (!empresa || !editForm) {
    return <p>Empresa não encontrada.</p>;
  }

  // Renderiza o formulário de edição
  return (
    <div className="container bg-white p-4 rounded shadow" style={{ maxWidth: "600px", margin: "20px auto" }}>
      <h1>Editar Empresa</h1>
      <EmpresaForm
        empresa={editForm}
        onChange={handleInputChange}
        onSave={handleSave} // Passa a função handleSave para o botão "Salvar"
        onCancel={() => router.back()} // Volta para a página anterior
      />
    </div>
  );
}