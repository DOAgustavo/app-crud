import { LicencaForm } from '../types/Licenca'; // Importa a interface LicencaForm do arquivo Licenca.ts

interface LicencaFormProps {
  form: LicencaForm; // Define o tipo correto para o formulário com base na interface LicencaForm
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Função para lidar com alterações nos campos do formulário.
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void; // Função para lidar com o envio do formulário.
}

// Componente funcional que renderiza o formulário de edição de licença.
export default function LicencaEditForm({ form, handleChange, onSubmit }: LicencaFormProps) {
  return (
    <form onSubmit={onSubmit}>
      {/* Campo para o número da licença */}
      <div className="mb-3">
        <label htmlFor="numero" className="form-label">
          Número
        </label>
        <input
          type="text"
          id="numero"
          name="numero"
          className="form-control"
          value={form.numero} // Valor atual do campo.
          onChange={handleChange} // Atualiza o estado ao alterar o campo.
          required // Campo obrigatório.
        />
      </div>

      {/* Campo para o órgão ambiental */}
      <div className="mb-3">
        <label htmlFor="orgaoAmbiental" className="form-label">
          Órgão Ambiental
        </label>
        <input
          type="text"
          id="orgaoAmbiental"
          name="orgaoAmbiental"
          className="form-control"
          value={form.orgaoAmbiental} // Valor atual do campo.
          onChange={handleChange} // Atualiza o estado ao alterar o campo.
          required // Campo obrigatório.
        />
      </div>

      {/* Campo para a data de emissão */}
      <div className="mb-3">
        <label htmlFor="emissao" className="form-label">
          Data de Emissão
        </label>
        <input
          type="date"
          id="emissao"
          name="emissao"
          className="form-control"
          value={form.emissao} // Valor atual do campo.
          onChange={handleChange} // Atualiza o estado ao alterar o campo.
          required // Campo obrigatório.
        />
      </div>

      {/* Campo para a data de validade */}
      <div className="mb-3">
        <label htmlFor="validade" className="form-label">
          Data de Validade
        </label>
        <input
          type="date"
          id="validade"
          name="validade"
          className="form-control"
          value={form.validade} // Valor atual do campo.
          onChange={handleChange} // Atualiza o estado ao alterar o campo.
          required // Campo obrigatório.
        />
      </div>

      {/* Botão para salvar as alterações */}
      <button type="submit" className="btn btn-primary w-100">
        Salvar Alterações
      </button>
    </form>
  );
}