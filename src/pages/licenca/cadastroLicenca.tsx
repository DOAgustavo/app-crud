"use client";
// Indica que este componente será renderizado no lado do cliente (Next.js).

import { useRouter } from "next/router";
// Importa o hook `useRouter` do Next.js para manipular a navegação e acessar os parâmetros da URL.

import { useCadastroLicenca } from "../hooks/useCadastroLicenca";
// Importa o hook customizado que encapsula a lógica de estado e manipulação do formulário de cadastro de licenças.

import LicencaForm from "../../componentes/cadastroLicenca";
// Importa o componente de formulário reutilizável para exibir e manipular os dados da licença.

export default function CadastroLicenca() {
  const router = useRouter();
  const { empresaId } = router.query;
  // Obtém o ID da empresa a partir dos parâmetros da URL.

  const empresaIdString = Array.isArray(empresaId) ? empresaId[0] : empresaId;
  // Garante que o `empresaId` seja uma string, mesmo que venha como um array.

  const { form, setForm, handleSubmit, handleCancel } = useCadastroLicenca(empresaIdString);
  // Desestruturação do hook `useCadastroLicenca` para acessar:
  // - `form`: Estado do formulário.
  // - `setForm`: Função para atualizar o estado do formulário.
  // - `handleSubmit`: Função para enviar os dados do formulário.
  // - `handleCancel`: Função para cancelar o cadastro e redirecionar.

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    // Atualiza o estado do formulário com base no campo que foi alterado.
  };

  return (
    <div className="container my-3 p-3 bg-white rounded shadow-s w-full" style={{ maxWidth: "500px" }}>
      {/* Define o contêiner do formulário com estilização básica. */}
      <h1 className="text-2xl font-bold mb-4">Nova Licença Ambiental</h1>
      {/* Título do formulário. */}

      <LicencaForm
        form={form}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isEditMode={false} // Define explicitamente que este formulário está no modo de cadastro.
      />
      {/* Componente de formulário reutilizável para manipular os dados da licença. */}
    </div>
  );
}