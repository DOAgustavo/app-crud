// Define as propriedades esperadas pelo componente `LicencaForm`.
interface LicencaFormProps {
  form: {
    numero: string; // Número da licença.
    orgaoAmbiental: string; // Nome do órgão ambiental responsável.
    emissao: string; // Data de emissão da licença.
    validade: string; // Data de validade da licença.
    empresaId: string; // ID da empresa associada à licença.
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Função para lidar com alterações nos campos do formulário.
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void; // Função para enviar os dados do formulário.
  onCancel: () => void; // Função para cancelar a operação.
  isEditMode: boolean; // Indica se o formulário está no modo de edição.
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
      {/* Campo para o número da licença */}
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

      {/* Campo para o órgão ambiental */}
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

      {/* Campo para a data de emissão */}
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

      {/* Campo para a data de validade */}
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

      {/* Botões de ação */}
      <button type="submit" className="btn btn-primary">
        {isEditMode ? "Atualizar" : "Salvar"}
        {/* Exibe "Atualizar" no modo de edição e "Salvar" no modo de criação. */}
      </button>
      <button type="button" className="btn btn-secondary ml-2" onClick={onCancel}>
        Voltar
        {/* Botão para cancelar a operação e voltar. */}
      </button>
    </form>
  );
}