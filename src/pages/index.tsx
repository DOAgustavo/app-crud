"use client";

import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import EmpresaList from '../componentes/EmpresaList';
import AppBar from '../componentes/appBar';
import { fetchEmpresas } from '../services/fetchEmpresas';
import { filterEmpresas } from '../services/filterEmpresas';

// Define o tipo para Empresa
export type Empresa = {
  id: number;
  razaoSocial: string;
};

export default function Home() {
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  // useEffect para buscar empresas quando o componente é montado
  useEffect(() => {
    async function loadEmpresas() {
      const data = await fetchEmpresas();
      setEmpresas(data);
    }

    loadEmpresas();
  }, []);

  // Filtra empresas com base no termo de pesquisa
  const filteredEmpresas = filterEmpresas(empresas, searchTerm);

  return (
    <div className="container mx-auto p-4">
      {/* AppBar com o nome do aplicativo, campo de pesquisa e link para criar uma nova empresa */}
      <AppBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      {/* Lista de empresas */}
      <EmpresaList
        empresas={filteredEmpresas}
        onClick={(id: number) => {
          console.log(`Empresa clicada: ${id}`);
        }}
      />
    </div>
  );
}