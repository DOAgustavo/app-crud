import { Licenca } from "../types/Licenca";

  
  interface LicencaItemProps {
    licenca: Licenca;
    onEditar: (id: number) => void;
    onExcluir: (id: number) => void;
  }
  
  export default function LicencaItem({ licenca, onEditar, onExcluir }: LicencaItemProps) {
    return (
      <li
        className="list-group-item d-flex justify-content-between align-items-center mb-2"
        style={{ borderRadius: "10px" }}
      >
        <div>
          <p><strong>Número:</strong> {licenca.numero}</p>
          <p><strong>Órgão Ambiental:</strong> {licenca.orgaoAmbiental}</p>
          <p><strong>Emissão:</strong> {new Date(licenca.emissao).toLocaleDateString()}</p>
          <p><strong>Validade:</strong> {new Date(licenca.validade).toLocaleDateString()}</p>
          <p><strong>Empresa:</strong> {licenca.empresa.razaoSocial}</p>
        </div>
        <div className="d-flex gap-2">
          <button
            className="btn btn-primary btn-sm"
            onClick={() => onEditar(licenca.id)}
          >
            Editar
          </button>
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