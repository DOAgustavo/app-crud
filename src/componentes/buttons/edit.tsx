import Link from 'next/link';

type EditButtonProps = {
  editUrl: string; // URL para onde o botão deve redirecionar
};

export default function EditButton({ editUrl }: EditButtonProps) {
  return (
    <button type="button" className="btn btn-warning btn-sm">
      <Link href={editUrl} legacyBehavior>
        <a className="text-decoration-none text-dark">Editar</a>
      </Link>
    </button>
  );
}