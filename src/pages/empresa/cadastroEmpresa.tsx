"use client";

import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function CadastroEmpresa() {
  // Estado para armazenar os dados do formulário
  const [form, setForm] = useState({
    razaoSocial: '',
    cnpj: '',
    cep: '',
    cidade: '',
    estado: '',
    bairro: '',
    complemento: '',
  });

  // Hook do Next.js para navegação
  const router = useRouter();

  // Função para lidar com mudanças nos campos do formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Envia os dados do formulário para a API
    await fetch('/api/empresa', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    });
    // Redireciona para a página inicial após o envio
    router.push('/');
  };

  return (
    // Container principal
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="container mx-auto p-4 bg-white shadow-md rounded-lg" style={{ maxWidth: '1000px', borderRadius: '10px', }}>
        {/* Título da página */}
        <h1 className="text-2xl font-bold mb-4 text-center">Nova Empresa</h1>
        {/* Formulário de cadastro de empresa */}
        <form onSubmit={handleSubmit} className="row g-3 needs-validation" noValidate>
          <div className="col-md-6">
            <label htmlFor="razaoSocial" className="form-label">Razão Social</label>
            <input
              type="text"
              className="form-control"
              id="razaoSocial"
              name="razaoSocial"
              value={form.razaoSocial}
              onChange={handleChange}
              required
            />
            <div className="invalid-feedback">
              Por favor, forneça uma razão social válida.
            </div>
          </div>
          <div className="col-md-6">
            <label htmlFor="cnpj" className="form-label">CNPJ</label>
            <input
              type="text"
              className="form-control"
              id="cnpj"
              name="cnpj"
              value={form.cnpj}
              onChange={handleChange}
              required
            />
            <div className="invalid-feedback">
              Por favor, forneça um CNPJ válido.
            </div>
          </div>
          <div className="col-md-6">
            <label htmlFor="cep" className="form-label">CEP</label>
            <input
              type="text"
              className="form-control"
              id="cep"
              name="cep"
              value={form.cep}
              onChange={handleChange}
              required
            />
            <div className="invalid-feedback">
              Por favor, forneça um CEP válido.
            </div>
          </div>
          <div className="col-md-6">
            <label htmlFor="cidade" className="form-label">Cidade</label>
            <input
              type="text"
              className="form-control"
              id="cidade"
              name="cidade"
              value={form.cidade}
              onChange={handleChange}
              required
            />
            <div className="invalid-feedback">
              Por favor, forneça uma cidade válida.
            </div>
          </div>
          <div className="col-md-6">
            <label htmlFor="estado" className="form-label">Estado</label>
            <input
              type="text"
              className="form-control"
              id="estado"
              name="estado"
              value={form.estado}
              onChange={handleChange}
              required
            />
            <div className="invalid-feedback">
              Por favor, forneça um estado válido.
            </div>
          </div>
          <div className="col-md-6">
            <label htmlFor="bairro" className="form-label">Bairro</label>
            <input
              type="text"
              className="form-control"
              id="bairro"
              name="bairro"
              value={form.bairro}
              onChange={handleChange}
              required
            />
            <div className="invalid-feedback">
              Por favor, forneça um bairro válido.
            </div>
          </div>
          <div className="col-md-12">
            <label htmlFor="complemento" className="form-label">Complemento</label>
            <input
              type="text"
              className="form-control"
              id="complemento"
              name="complemento"
              value={form.complemento}
              onChange={handleChange}
            />
          </div>
          <div className="col-12">
            <button className="btn btn-primary" type="submit">Salvar</button>
          </div>
        </form>
        {/* Link para adicionar nova licença */}
        <Link href="/empresa/cadastroLicenca" legacyBehavior>
          <a className="bg-green-500 text-white px-4 py-2 rounded mt-4 inline-block text-center w-full">
            Adicionar Nova Licença
          </a>
        </Link>
      </div>
    </div>
  );
}