// filepath: src/pages/empresa/cadastroEmpresa.tsx
"use client";

import { useState, useEffect } from 'react';

interface Licenca {
  id: number;
  numero: string;
  orgaoAmbiental: string;
}
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function CadastroEmpresa() {
  const [form, setForm] = useState({
    razaoSocial: '',
    cnpj: '',
    cep: '',
    cidade: '',
    estado: '',
    bairro: '',
    complemento: '',
  });
  const [licencas, setLicencas] = useState<Licenca[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchLicencas() {
      try {
        const response = await fetch('/api/licenca');
        const data = await response.json();
        if (Array.isArray(data)) {
          setLicencas(data);
        } else {
          console.error('Dados recebidos não são um array:', data);
        }
      } catch (error) {
        console.error('Erro ao buscar licenças:', error);
      }
    }

    fetchLicencas();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetch('/api/empresa', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    });
    router.push('/');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Nova Empresa</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Razão Social</label>
          <input
            type="text"
            name="razaoSocial"
            value={form.razaoSocial}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">CNPJ</label>
          <input
            type="text"
            name="cnpj"
            value={form.cnpj}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">CEP</label>
          <input
            type="text"
            name="cep"
            value={form.cep}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Cidade</label>
          <input
            type="text"
            name="cidade"
            value={form.cidade}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Estado</label>
          <input
            type="text"
            name="estado"
            value={form.estado}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Bairro</label>
          <input
            type="text"
            name="bairro"
            value={form.bairro}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Complemento</label>
          <input
            type="text"
            name="complemento"
            value={form.complemento}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Salvar
        </button>
      </form>
      <h2 className="text-xl font-bold mt-8">Licenças Ambientais</h2>
      <ul className="mt-4">
        {licencas.map((licenca) => (
          <li key={licenca.id} className="border-b py-2">
            {licenca.numero} - {licenca.orgaoAmbiental}
          </li>
        ))}
      </ul>
      <Link href="/empresa/cadastroLicenca" legacyBehavior>
        <a className="bg-green-500 text-white px-4 py-2 rounded mt-4 inline-block">Adicionar Nova Licença</a>
      </Link>
    </div>
  );
}