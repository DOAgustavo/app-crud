"use client";

import { useEffect, useState } from 'react';
import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';
import EmpresaList from './componentes/EmpresaList';

// Define o tipo para Empresa
type Empresa = {
  id: number;
  razaoSocial: string;
  // Adicione outros campos conforme necessário
};

// Inicializa o Prisma Client
const prisma = new PrismaClient();

export default function Home() {
  // Estado para armazenar a lista de empresas
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  // Estado para armazenar o termo de pesquisa
  const [searchTerm, setSearchTerm] = useState('');

  // useEffect hook para buscar empresas quando o componente é montado
  useEffect(() => {
    async function fetchEmpresas() {
      try {
        // Busca empresas da API
        const response = await fetch('/api/empresa');
        const data = await response.json();
        // Verifica se os dados são um array e define o estado de empresas
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
  }, []);

  // Função para lidar com a exclusão de uma empresa
  const handleDelete = async (id: number) => {
    try {
      // Envia uma requisição DELETE para a API
      await fetch(`/api/empresa/${id}`, {
        method: 'DELETE',
      });
      // Atualiza o estado de empresas filtrando a empresa excluída
      setEmpresas(empresas.filter((empresa) => empresa.id !== id));
    } catch (error) {
      console.error('Erro ao excluir empresa:', error);
    }
  };

  // Filtra empresas com base no termo de pesquisa
  const filteredEmpresas = empresas.filter((empresa) =>
    empresa.razaoSocial.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      {/* AppBar com o nome do aplicativo, campo de pesquisa e link para criar uma nova empresa */}
      <div className="flex justify-between items-center mb-4">
        {/* bootstrap para criar um AppBar */}
        <div className="container text-center">
          <div className="row align-items-center">
            <div className="col">
              <h1 className="text-2xl font-bold text-white">app-CRUD</h1>
            </div>
            <div className="col">
              <input
                type="text"
                placeholder="Pesquisar"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border p-2 rounded"
              />
            </div>
            <div className="col ">
              <button type="button" className="btn btn-primary btn-sm">
                <Link href="/empresa/cadastroEmpresa" legacyBehavior>
                  <a className="bg-blue-500 text-white px-4 py-2 text-decoration-none rounded">Nova Empresa</a>
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Lista de empresas */}
      <EmpresaList empresas={filteredEmpresas} onDelete={handleDelete} />
    </div>
  );
}