interface LicencaFormProps {
    form: {
      numero: string;
      orgaoAmbiental: string;
      emissao: string;
      validade: string;
      empresaId: string;
    };
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    onCancel: () => void;
    isEditMode: boolean; // Indica se o formulário está no modo de edição
  }
  
  export default function LicencaForm({
    form,
    onChange,
    onSubmit,
    onCancel,
    isEditMode,
  }: LicencaFormProps) {
    return (
      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Número</label>
          <input
            type="text"
            name="numero"
            value={form.numero}
            onChange={onChange}
            className="w-full px-4 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Órgão Ambiental</label>
          <input
            type="text"
            name="orgaoAmbiental"
            value={form.orgaoAmbiental}
            onChange={onChange}
            className="w-full px-4 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Emissão</label>
          <input
            type="date"
            name="emissao"
            value={form.emissao}
            onChange={onChange}
            className="w-full px-4 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Validade</label>
          <input
            type="date"
            name="validade"
            value={form.validade}
            onChange={onChange}
            className="w-full px-4 py-2 border rounded"
          />
        </div>
  
        <button type="submit" className="btn btn-primary">
          {isEditMode ? "Atualizar" : "Salvar"}
        </button>
        <button type="button" className="btn btn-secondary ml-2" onClick={onCancel}>
          Voltar
        </button>
      </form>
    );
  }