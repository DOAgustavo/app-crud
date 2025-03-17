import React from "react";

// Define as propriedades esperadas pelo componente `EmpresaForm`.
interface EmpresaFormProps {
  empresa: {
    razaoSocial: string;
    cnpj: string;
    cep: string;
    cidade: string;
    estado: string;
    bairro: string;
    complemento: string;
  } | null; // Permite que o objeto seja nulo, indicando que os dados podem ainda não estar carregados.
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Função para lidar com alterações nos campos do formulário.
  onSave: () => void; // Função para salvar os dados do formulário.
  onCancel: () => void; // Função para cancelar a operação.
}

export default function EmpresaForm({ empresa, onChange, onSave, onCancel }: EmpresaFormProps) {
  if (!empresa) {
    // Verifica se os dados da empresa ainda não foram carregados.
    return <p>Carregando dados da empresa...</p>; // Exibe uma mensagem enquanto os dados estão sendo carregados.
  }

  return (
    <form>
      {/* Itera sobre as chaves do objeto `empresa` para gerar os campos do formulário dinamicamente. */}
      {Object.keys(empresa).map((key) => {
        if (key === "id") return null; // Ignora o campo "id", pois ele não deve ser editável.
        return (
          <div className="mb-3" key={key}>
            {/* Renderiza um rótulo para o campo com a primeira letra maiúscula. */}
            <label htmlFor={key}>
              <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong>
            </label>
            <input
              type="text"
              id={key}
              name={key}
              className="form-control"
              value={empresa[key as keyof typeof empresa]} // Define o valor do campo com base nos dados da empresa.
              onChange={onChange} // Chama a função `onChange` ao alterar o valor do campo.
            />
          </div>
        );
      })}
      <div style={{ display: "flex", gap: "10px" }}>
        {/* Botão para salvar os dados do formulário. */}
        <button className="btn btn-primary" type="button" onClick={onSave}>
          Salvar
        </button>
        {/* Botão para cancelar a operação. */}
        <button className="btn btn-secondary" type="button" onClick={onCancel}>
          Cancelar
        </button>
      </div>
    </form>
  );
}