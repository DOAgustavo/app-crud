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
  const [empresa, setEmpresa] = useState<Empresa | null>(null); // Dados da empresa vinculada
  const router = useRouter();
  const { empresaId, id: licencaId } = router.query; // Captura o ID da empresa e da licença da URL

  useEffect(() => {
    if (empresaId) {
      setForm((prevForm) => ({
        ...prevForm,
        empresaId: empresaId as string, // Define o ID da empresa no formulário
      }));

      const fetchEmpresa = async () => {
        try {
          const response = await fetch(`/api/empresa/${empresaId}`);
          if (!response.ok) {
            throw new Error('Erro ao buscar empresa');
          }
          const data = await response.json();
          setEmpresa(data); // Armazena os dados da empresa vinculada
        } catch (error) {
          console.error('Erro ao buscar empresa:', error);
        }
      };

      fetchEmpresa();
    }

    if (licencaId) {
      const fetchLicenca = async () => {
        try {
          const response = await fetch(`/api/licenca/${licencaId}`);
          if (!response.ok) {
            throw new Error('Erro ao buscar licença');
          }
          const data = await response.json();
          setForm({
            numero: data.numero,
            orgaoAmbiental: data.orgaoAmbiental,
            emissao: data.emissao.split('T')[0], // Formata a data para o input
            validade: data.validade.split('T')[0], // Formata a data para o input
            empresaId: data.empresaId.toString(),
          });
        } catch (error) {
          console.error('Erro ao buscar licença:', error);
        }
      };

      fetchLicenca();
    }
  }, [empresaId, licencaId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Verifica se todos os campos estão preenchidos
    if (!form.numero || !form.orgaoAmbiental || !form.emissao || !form.validade) {
      alert('Por favor, preencha todos os campos antes de salvar.');
      return;
    }

    // Exibe uma confirmação antes de salvar
    const confirmSave = window.confirm(
      licencaId ? 'Tem certeza de que deseja atualizar esta licença?' : 'Tem certeza de que deseja salvar esta nova licença?'
    );

    if (!confirmSave) {
      // Se o usuário cancelar, interrompe o processo
      return;
    }

    try {
      const method = licencaId ? 'PUT' : 'POST'; // Usa PUT para editar, POST para criar
      const endpoint = licencaId ? `/api/licenca/${licencaId}` : '/api/licenca';

      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error('Erro ao salvar licença');
      }

      // Redireciona para a página de detalhes da empresa
      router.push(`/empresa/detalhesEmpresa?id=${empresaId}`);
    } catch (error) {
      console.error('Erro ao salvar licença:', error);
      alert('Erro ao salvar licença. Tente novamente.');
    }
  };

  return (
    <div className="container mx-auto p-4 bg-white shadow">
      <h1 className="text-2xl font-bold mb-4">
        Nova Licença Ambiental - {empresa ? empresa.razaoSocial : 'Carregando...'}
      </h1>

      <form onSubmit={handleSubmit}>
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

       {/* Botão de Salvar */}
<button
  type="submit"
  className="btn btn-primary"
>
  {licencaId ? 'Atualizar' : 'Salvar'}
</button>

        {/* Botão de Voltar */}
        {/* Botão de Voltar */}
<button
  type="button"
  className="btn btn-secondary"
  onClick={() => router.push(`/empresa/detalhesEmpresa?id=${empresaId}`)}
>
  Voltar
</button>
      </form>
    </div>
  );
}