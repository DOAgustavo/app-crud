"use client";

import { useEffect, useState } from 'react';
import { Empresa } from '@prisma/client';
import Link from 'next/link';

export default function Home() {
  const [empresas, setEmpresas] = useState<Empresa[]>([]);

  useEffect(() => {
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
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Empresas</h1>
      <Link href="/empresa/cadastroEmpresa" legacyBehavior>
        <a className="bg-blue-500 text-white px-4 py-2 rounded">Criar Nova Empresa</a>
      </Link>
      <ul className="mt-4">
        {empresas.map((empresa) => (
          <li key={empresa.id} className="border-b py-2">
            {empresa.razaoSocial}
          </li>
        ))}
      </ul>
    </div>
  );
}