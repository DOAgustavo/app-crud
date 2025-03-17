interface ExcluirButtonProps {
  id: number;
  onExcluir: () => void;
  style?: React.CSSProperties;
}

export default function ExcluirButton({ id, onExcluir, style }: ExcluirButtonProps) {
  return (
    <button
      className="btn btn-danger"
      style={style}
      onClick={onExcluir}
    >
      Excluir
    </button>
  );
}