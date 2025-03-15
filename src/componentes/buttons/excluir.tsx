import { useRouter } from 'next/router';

type ExcluirButtonProps = {
  id: number; // ID da empresa a ser excluída
  redirectUrl: string; // URL para redirecionar após a exclusão
};

export default function ExcluirButton({ id, redirectUrl }: ExcluirButtonProps) {
  const router = useRouter();

  const handleExcluir = async () => {
    const confirm = window.confirm('Tem certeza que deseja excluir esta empresa?');
    if (!confirm) return;

    try {
      const response = await fetch(`/api/empresa/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Empresa excluída com sucesso!');
        router.push(redirectUrl); // Redireciona para a URL especificada
      } else {
        alert('Erro ao excluir a empresa.');
      }
    } catch (error) {
      console.error('Erro ao excluir empresa:', error);
      alert('Ocorreu um erro ao tentar excluir a empresa.');
    }
  };

  return (
    <button
      type="button"
      className="btn btn-danger btn-sm"
      onClick={handleExcluir}
    >
      Excluir
    </button>
  );
}