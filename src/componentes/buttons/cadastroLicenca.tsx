import { useRouter } from 'next/router';

type CadastroLicencaButtonProps = {
  empresaId: number;
};

export default function CadastroLicencaButton({ empresaId }: CadastroLicencaButtonProps) {
  const router = useRouter();

  return (
    <button
      className="btn btn-success btn-sm w-auto"
      onClick={() => router.push(`/cadastros/cadastroLicenca?empresaId=${empresaId}`)} // Redireciona para o cadastro de licença
    >
      Cadastrar Licença
    </button>
  );
}