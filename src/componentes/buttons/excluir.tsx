type ExcluirButtonProps = {
    onClick: () => void; // Função a ser executada ao clicar no botão
  };
  
  export default function ExcluirButton({ onClick }: ExcluirButtonProps) {
    return (
      <button
        type="button"
        className="btn btn-danger btn-sm"
        onClick={onClick}
      >
        Excluir
      </button>
    );
  }