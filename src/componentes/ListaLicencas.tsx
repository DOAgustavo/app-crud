import { useRouter } from "next/router";
import { Licenca } from "../types/Licenca";
// Importa o hook `useRouter` do Next.js para manipular a navegação.


// Define a interface `Licenca`, que representa os dados de uma licença.

interface LicencaItemProps {
  licenca: Licenca; // Objeto da licença a ser exibida.
  onExcluir: (id: number) => void; // Função para excluir a licença.
}
// Define a interface `LicencaItemProps`, que especifica as propriedades esperadas pelo componente.

export default function LicencaItem({ licenca, onExcluir }: LicencaItemProps) {
  const router = useRouter();
  // Instancia o hook `useRouter` para manipular a navegação.

  return (
    <li
      className="list-group-item d-flex justify-content-between align-items-center mb-2"
      style={{ borderRadius: "10px" }}
    >
      {/* Renderiza um item da lista com estilização básica */}
      <div>
        {/* Exibe os detalhes da licença */}
        <p><strong>Número:</strong> {licenca.numero}</p>
        <p><strong>Órgão Ambiental:</strong> {licenca.orgaoAmbiental}</p>
        <p><strong>Emissão:</strong> {new Date(licenca.emissao).toLocaleDateString()}</p>
        <p><strong>Validade:</strong> {new Date(licenca.validade).toLocaleDateString()}</p>
      </div>
      <div className="d-flex gap-2">
        {/* Botão para editar a licença */}
        <button
          className="btn btn-primary btn-sm"
          onClick={() => router.push(`/licenca/editarLicenca?id=${licenca.id}`)}
        >
          Editar
        </button>
        {/* Botão para excluir a licença */}
        <button
          className="btn btn-danger btn-sm"
          onClick={() => onExcluir(licenca.id)}
        >
          Excluir
        </button>
      </div>
    </li>
  );
}