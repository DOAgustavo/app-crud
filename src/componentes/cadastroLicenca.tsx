import {FormState } from '../types/Licenca';
// Define as propriedades esperadas pelo componente `LicencaForm`.
interface LicencaFormProps {
  form: FormState;
  empresas: { id: number; razaoSocial: string }[]; // Lista de empresas disponíveis.
  empresaId?: string | string[]; // ID da empresa, se disponível.
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void; // Função para lidar com alterações nos campos do formulário.
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void; // Função para lidar com o envio do formulário.
}

// Componente funcional que renderiza o formulário de cadastro de licença.
export default function LicencaForm({
  form,
  empresas,
  empresaId,
  handleChange,
  handleSubmit,
}: LicencaFormProps) {
  return (
    <form onSubmit={handleSubmit}>
      {/* Campo para selecionar a empresa, exibido apenas se `empresaId` não estiver na URL */}
      {!empresaId && (
        <div className="mb-3">
          <label htmlFor="empresaId" className="form-label">
            Empresa
          </label>
          <select
            id="empresaId"
            name="empresaId"
            className="form-control"
            value={form.empresaId} // Valor atual do campo.
            onChange={handleChange} // Atualiza o estado ao alterar o campo.
            required // Campo obrigatório.
          >
            <option value="">Selecione uma empresa</option>
            {empresas.map((empresa) => (
              <option key={empresa.id} value={empresa.id}>
                {empresa.razaoSocial}
              </option>
            ))}
          </select>
        </div>
      )}

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

      {/* Botão para enviar o formulário */}
      <button type="submit" className="btn btn-primary w-100">
        Salvar Licença
      </button>
    </form>
  );
}