"use client";
// Indica que este componente será renderizado no lado do cliente (Next.js).

import Link from "next/link";
// Importa o componente `Link` do Next.js para navegação entre páginas.

import "bootstrap/dist/css/bootstrap.min.css";
// Importa os estilos do Bootstrap para estilização do formulário.

import { useCadastroEmpresa } from "../../hooks/useCadastroEmpresa";
// Importa o hook customizado que encapsula a lógica de estado e manipulação do formulário.

export default function CadastroEmpresa() {
  const { form, handleChange, handleSubmit } = useCadastroEmpresa();
  // Desestruturação do hook `useCadastroEmpresa` para acessar:
  // - `form`: Estado do formulário.
  // - `handleChange`: Função para atualizar os campos do formulário.
  // - `handleSubmit`: Função para enviar os dados do formulário.

  // Função para renderizar os campos do formulário.
  const renderInput = (label: string, name: string, required = true) => (
    <div className="col-12 col-md-6">
      {/* Em telas pequenas, ocupa toda a largura (col-12). Em telas médias, divide em 2 colunas (col-md-6). */}
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input
        type="text"
        className="form-control form-control-sm"
        id={name}
        name={name}
        value={form[name as keyof typeof form]}
        // Acessa o valor do campo correspondente no estado `form`.
        onChange={handleChange}
        // Atualiza o estado do formulário ao alterar o valor do campo.
        required={required}
        // Define se o campo é obrigatório.
      />
      {required && (
        <div className="invalid-feedback">
          Por favor, forneça um {label.toLowerCase()} válido.
        </div>
      )}
      {/* Exibe uma mensagem de validação caso o campo obrigatório não seja preenchido. */}
    </div>
  );

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100">
      {/* Centraliza o formulário vertical e horizontalmente na tela. */}
      <div
        className="container p-4 bg-white shadow-md rounded"
        style={{ maxWidth: "800px" }}
      >
        {/* Define o contêiner do formulário com estilização básica. */}
        <h1 className="text-center mb-4">Nova Empresa</h1>
        {/* Título do formulário. */}
        <form
          onSubmit={handleSubmit}
          // Define a função para enviar os dados do formulário.
          className="row g-3 needs-validation"
          noValidate
          // Desativa a validação padrão do navegador.
        >
          {renderInput("Razão Social", "razaoSocial")}
          {renderInput("CNPJ", "cnpj")}
          {renderInput("CEP", "cep")}
          {renderInput("Cidade", "cidade")}
          {renderInput("Estado", "estado")}
          {renderInput("Bairro", "bairro")}
          {renderInput("Complemento", "complemento", false)}
          {/* Renderiza os campos do formulário usando a função `renderInput`. */}
          <div className="col-12">
            <button className="btn btn-primary w-15" type="submit">
              Salvar
            </button>
            {/* Botão para enviar o formulário. */}
          </div>
          <div className="col-12 mt-3">
            <Link href="/" legacyBehavior>
              <a className="btn btn-secondary w-15 text-center">
                Voltar para a Página Principal
              </a>
            </Link>
            {/* Link para voltar à página principal. */}
          </div>
        </form>
      </div>
    </div>
  );
}