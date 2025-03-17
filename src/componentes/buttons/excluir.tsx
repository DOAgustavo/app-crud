interface ExcluirButtonProps {
  id: number; // ID do item a ser excluído.
  onExcluir: () => void; // Função chamada ao clicar no botão de exclusão.
  style?: React.CSSProperties; // Estilo opcional para personalizar o botão.
}
// Define as propriedades esperadas pelo componente `ExcluirButton`.

export default function ExcluirButton({ id, onExcluir, style }: ExcluirButtonProps) {
  // Componente funcional que renderiza um botão de exclusão.

  return (
    <button
      className="btn btn-danger"
      // Classe CSS para estilizar o botão como um botão de exclusão (vermelho).
      style={style}
      // Aplica estilos personalizados, se fornecidos.
      onClick={onExcluir}
      // Chama a função `onExcluir` ao clicar no botão.
    >
      Excluir
      {/* Texto exibido no botão. */}
    </button>
  );
}