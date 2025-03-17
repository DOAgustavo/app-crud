import React from "react";

interface EmpresaFormProps {
  empresa: {
    razaoSocial: string;
    cnpj: string;
    cep: string;
    cidade: string;
    estado: string;
    bairro: string;
    complemento: string;
  } | null; // Permite que o objeto seja nulo
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
  onCancel: () => void;
}

export default function EmpresaForm({ empresa, onChange, onSave, onCancel }: EmpresaFormProps) {
  if (!empresa) {
    return <p>Carregando dados da empresa...</p>; // Exibe uma mensagem enquanto os dados estão sendo carregados
  }

  return (
    <form>
      {Object.keys(empresa).map((key) => {
        if (key === "id") return null; // Ignora o campo "id"
        return (
          <div className="mb-3" key={key}>
            <label htmlFor={key}>
              <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong>
            </label>
            <input
              type="text"
              id={key}
              name={key}
              className="form-control"
              value={empresa[key as keyof typeof empresa]}
              onChange={onChange}
            />
          </div>
        );
      })}
      <div style={{ display: "flex", gap: "10px" }}>
        <button className="btn btn-primary" type="button" onClick={onSave}>
          Salvar
        </button>
        <button className="btn btn-secondary" type="button" onClick={onCancel}>
          Cancelar
        </button>
      </div>
    </form>
  );
}