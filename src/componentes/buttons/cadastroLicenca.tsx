import { useRouter } from 'next/router';
// Importa o hook `useRouter` do Next.js para manipular a navegação entre páginas.

type CadastroLicencaButtonProps = {
  empresaId: number; // ID da empresa para associar à licença que será cadastrada.
};
// Define as propriedades esperadas pelo componente `CadastroLicencaButton`.

export default function CadastroLicencaButton({ empresaId }: CadastroLicencaButtonProps) {
  // Componente funcional que renderiza um botão para redirecionar ao cadastro de licença.

  const router = useRouter();
  // Instancia o hook `useRouter` para manipular a navegação.

  return (
    <button
      className="btn btn-success btn-sm w-auto"
      // Classe CSS para estilizar o botão como um botão de sucesso (verde).
      onClick={() => router.push(`/cadastros/cadastroLicenca?empresaId=${empresaId}`)}
      // Redireciona para a página de cadastro de licença, passando o ID da empresa como parâmetro na URL.
    >
      Cadastrar Licença
      {/* Texto exibido no botão. */}
    </button>
  );
}