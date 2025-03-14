import React from 'react';
import { useRouter } from 'next/router';

interface ExcluirButtonProps {
  id: number;
  redirectUrl: string;
  style?: React.CSSProperties; // Adiciona suporte à propriedade "style"
}

const ExcluirButton: React.FC<ExcluirButtonProps> = ({ id, redirectUrl, style }) => {
  const router = useRouter();

  const handleExcluir = async () => {
    const confirm = window.confirm('Tem certeza que deseja excluir este item?');
    if (!confirm) return;

    try {
      const response = await fetch(`/api/empresa/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Item excluído com sucesso!');
        router.push(redirectUrl); // Redireciona para a URL especificada
      } else {
        alert('Erro ao excluir o item.');
      }
    } catch (error) {
      console.error('Erro ao excluir o item:', error);
      alert('Ocorreu um erro ao tentar excluir o item.');
    }
  };

  return (
    <button
      className="btn btn-danger"
      style={style} // Aplica o estilo recebido
      onClick={handleExcluir}
    >
      Excluir
    </button>
  );
};

export default ExcluirButton;