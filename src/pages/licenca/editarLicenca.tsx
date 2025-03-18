import { useRouter } from "next/router";
// Importa o hook `useRouter` do Next.js para manipular a navegação.

import { useEditarLicenca } from "../../pages/hooks/useEditarLicenca";
// Importa o hook customizado `useEditarLicenca` para gerenciar o carregamento e envio dos dados da licença.

import LicencaForm from "../../componentes/LicencaEditForm";
// Importa o componente `LicencaForm`, que encapsula o formulário de edição da licença.

export default function EditarLicenca() {
  const router = useRouter();
  // Instancia o hook `useRouter` para acessar os parâmetros da URL e manipular a navegação.

  const { id } = router.query;
  // Obtém o ID da licença a partir dos parâmetros da URL.

  const { form, loading, error, handleChange, handleSubmit } = useEditarLicenca(id);
  // Usa o hook `useEditarLicenca` para carregar os dados da licença, gerenciar o estado do formulário,
  // lidar com alterações nos campos e enviar os dados atualizados.

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Previne o comportamento padrão do formulário (recarregar a página).

    const success = await handleSubmit();
    // Chama a função `handleSubmit` do hook para enviar os dados atualizados.

    if (success) {
      router.back();
      // Retorna para a página anterior após salvar as alterações com sucesso.
    }
  };

  if (loading) {
    // Exibe uma mensagem de carregamento enquanto os dados da licença estão sendo buscados.
    return <p className="text-center">Carregando dados da licença...</p>;
  }

  if (error) {
    // Exibe uma mensagem de erro caso ocorra algum problema ao carregar os dados ou enviar as alterações.
    return <p className="text-center text-danger">{error}</p>;
  }

  return (
    <div className="container my-3 p-3 bg-white rounded shadow-sm" style={{ maxWidth: "600px" }}>
      {/* Contêiner principal com estilização básica */}
      <h1 className="text-center mb-4">Editar Licença</h1>
      {/* Título da página */}
      <LicencaForm form={form} handleChange={handleChange} onSubmit={onSubmit} />
      {/* Renderiza o componente `LicencaForm`, passando os dados do formulário, a função de alteração e o envio */}
    </div>
  );
}