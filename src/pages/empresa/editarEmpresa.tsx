"use client";
// Indica que este componente será renderizado no lado do cliente (Next.js).

import { useEmpresa } from "../../hooks/useEditarEmpresa";
// Hook customizado que encapsula a lógica de busca, atualização e estado da empresa.

import EmpresaForm from "../../componentes/EmpresaEditForm";
// Componente reutilizável para exibir e editar os dados da empresa.

export default function EditarEmpresa() {
  const { empresa, setEmpresa, loading, saveEmpresa, cancel } = useEmpresa();
  // Desestruturação do hook `useEmpresa` para acessar os dados da empresa, funções de manipulação e estado de carregamento.

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Atualiza o estado da empresa com base nos campos do formulário.
    if (!empresa) return;

    setEmpresa({
      ...empresa, // Mantém os valores existentes.
      [e.target.name]: e.target.value, // Atualiza o campo específico com o novo valor.
    });
  };

  if (loading) {
    // Exibe uma mensagem de carregamento enquanto os dados estão sendo buscados.
    return <p>Carregando...</p>;
  }

  if (!empresa) {
    // Exibe uma mensagem caso a empresa não seja encontrada.
    return <p>Empresa não encontrada.</p>;
  }

  return (
    // Renderiza o formulário de edição da empresa.
    <div className="container my-3 p-3 bg-white rounded shadow-sm" style={{ maxWidth: "500px" }}>
      <h1 className="text-center">Editar Empresa</h1>
      <EmpresaForm
        empresa={empresa} // Dados da empresa para preencher o formulário.
        onChange={handleChange} // Função para lidar com mudanças nos campos.
        onSave={saveEmpresa} // Função para salvar as alterações.
        onCancel={cancel} // Função para cancelar a edição.
      />
    </div>
  );
}