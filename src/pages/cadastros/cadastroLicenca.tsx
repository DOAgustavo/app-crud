// filepath: src/pages/empresa/cadastroLicenca.tsx
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Empresa } from '@prisma/client';

export default function CadastroLicenca() {
  const [form, setForm] = useState({
    numero: '',
    orgaoAmbiental: '',
    emissao: '',
    validade: '',
    empresaId: '',
  });
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const router = useRouter();
  const { empresaId } = router.query; // Captura o empresaId da URL

  useEffect(() => {
    if (empresaId) {
      setForm((prevForm) => ({
        ...prevForm,
        empresaId: empresaId as string, // Define o empresaId no formulário
      }));
    }

    async function fetchEmpresas() {
      try {
        const response = await fetch('/api/empresa');
        const data = await response.json();
        if (Array.isArray(data)) {
          setEmpresas(data);
        } else {
          console.error('Dados recebidos não são um array:', data);
        }
      } catch (error) {
        console.error('Erro ao buscar empresas:', error);
      }
    }

    fetchEmpresas();
  }, [empresaId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetch('/api/licenca', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    });
    router.push('/empresa/cadastroEmpresa');
  };

  return (
    <div className="container mx-auto p-4 bg-white shadow">
      <h1 className="text-2xl font-bold mb-4">Nova Licença Ambiental</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Empresa</label>
          <select
            name="empresaId"
            value={form.empresaId}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
            disabled // Desabilita o campo para evitar alterações
          >
            <option value="">Selecione uma empresa</option>
            {empresas.map((empresa) => (
              <option key={empresa.id} value={empresa.id}>
                {empresa.razaoSocial}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Número</label>
          <input
            type="text"
            name="numero"
            value={form.numero}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Órgão Ambiental</label>
          <input
            type="text"
            name="orgaoAmbiental"
            value={form.orgaoAmbiental}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Emissão</label>
          <input
            type="date"
            name="emissao"
            value={form.emissao}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Validade</label>
          <input
            type="date"
            name="validade"
            value={form.validade}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Salvar
        </button>
      </form>
    </div>
  );
}