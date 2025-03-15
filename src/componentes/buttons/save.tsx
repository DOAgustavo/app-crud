import { useState } from 'react';

interface SaveButtonProps {
  id: number;
  editForm: any; // Substitua `any` pelo tipo correto, se disponível
  setEmpresa: (empresa: any) => void; // Substitua `any` pelo tipo correto, se disponível
  onSuccess?: () => void; // Callback opcional para ações após salvar
}

export default function SaveButton({ id, editForm, setEmpresa, onSuccess }: SaveButtonProps) {
  const [isLoading, setIsLoading] = useState(false); // Estado de carregamento

  return (
    <button
      className="btn btn-success btn-sm w-auto"
      onClick={async () => {
        setIsLoading(true); // Ativa o estado de carregamento
        try {
          const response = await fetch(`/api/empresa/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(editForm), // Envia os dados do formulário
          });

          if (response.ok) {
            const updatedEmpresa = await response.json();
            setEmpresa(updatedEmpresa); // Atualiza os dados exibidos
            alert('Dados atualizados com sucesso!');
            if (onSuccess) {
              onSuccess(); // Executa a função de callback, se fornecida
            }
          } else {
            alert('Erro ao atualizar os dados.');
          }
        } catch (error) {
          console.error('Erro ao salvar alterações:', error);
        } finally {
          setIsLoading(false); // Desativa o estado de carregamento
        }
      }}
      disabled={isLoading} // Desativa o botão enquanto está carregando
    >
      {isLoading ? 'Salvando...' : 'Salvar'}
    </button>
  );
}