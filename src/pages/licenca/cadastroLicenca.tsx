import { useRouter } from "next/router";
// Importa o hook `useRouter` do Next.js para manipular a navegação.

import { useCadastroLicenca } from "../../pages/hooks/useCadastroLicenca";
// Importa o hook customizado `useCadastroLicenca` para gerenciar o estado do formulário e carregar as empresas.

import LicencaForm from "../../componentes/cadastroLicenca";
// Importa o componente `LicencaForm`, que encapsula o formulário de cadastro de licença.

export default function CadastroLicenca() {
  const router = useRouter();
  // Instancia o hook `useRouter` para acessar os parâmetros da URL e manipular a navegação.

  const { empresaId } = router.query;
  // Obtém o `empresaId` da URL, se existir.

  const { empresas, form, loadingEmpresas, handleChange } = useCadastroLicenca(empresaId);
  // Usa o hook `useCadastroLicenca` para carregar as empresas, gerenciar o estado do formulário
  // e lidar com alterações nos campos.

  // Função para enviar os dados do formulário para a API.
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário.

    try {
      const res = await fetch("/api/licenca", {
        method: "POST", // Método HTTP para criar uma nova licença.
        headers: {
          "Content-Type": "application/json", // Define o tipo de conteúdo como JSON.
        },
        body: JSON.stringify(form), // Converte os dados do formulário para JSON e os envia para a API.
      });

      if (!res.ok) {
        throw new Error("Erro ao criar licença."); // Lança um erro se a resposta da API não for bem-sucedida.
      }

      // Verifica se o `empresaId` está definido e redireciona para a página correspondente.
      if (empresaId) {
        router.push(`/empresa/detalhesEmpresa?id=${empresaId}`);
        // Redireciona para a página de detalhes da empresa.
      } else {
        router.push("/");
        // Redireciona para o menu principal caso o `empresaId` não esteja definido.
      }
    } catch (error) {
      console.error("Erro ao criar licença:", error); // Exibe o erro no console.
    }
  };

  if (loadingEmpresas) {
    // Exibe uma mensagem de carregamento enquanto as empresas estão sendo buscadas.
    return <p>Carregando empresas...</p>;
  }

  return (
    <div className="container my-3 p-3 bg-white rounded shadow-sm" style={{ maxWidth: "600px" }}>
      {/* Contêiner principal com estilização básica */}
      <h1 className="text-center mb-4">Cadastrar Licença</h1>
      {/* Título da página */}
      <LicencaForm
        form={form} // Dados do formulário.
        empresas={empresas} // Lista de empresas disponíveis.
        empresaId={empresaId} // ID da empresa, se disponível.
        handleChange={handleChange} // Função para lidar com alterações nos campos do formulário.
        handleSubmit={handleSubmit} // Função para enviar os dados do formulário.
      />
    </div>
  );
}