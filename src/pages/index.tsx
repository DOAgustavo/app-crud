"use client"; // Indica que este componente é renderizado no lado do cliente (Next.js).

import { useEffect, useState } from 'react'; // Hooks do React para gerenciar estado e efeitos colaterais.
import 'bootstrap/dist/css/bootstrap.min.css'; // Estilos globais do Bootstrap.
import EmpresaList from '../componentes/EmpresaList'; // Componente para exibir a lista de empresas.
import AppBar from '../componentes/appBar'; // Componente para a barra de pesquisa e navegação.
import { fetchEmpresas } from '../services/fetchEmpresas'; // Função para buscar empresas da API.
import { Empresa } from '../types/Empresa'; // Tipo que define a estrutura de uma empresa.
import { filterEmpresas } from '../services/filterEmpresas'; // Função para filtrar empresas com base no termo de busca.

// Componente principal da página inicial.
export default function Home() {
  // Estado para armazenar a lista de empresas buscadas da API.
  const [empresas, setEmpresas] = useState<Empresa[]>([]);

  // Estado para armazenar o termo de busca digitado pelo usuário.
  const [searchTerm, setSearchTerm] = useState('');

  // Estado para indicar se os dados estão sendo carregados.
  const [isLoading, setIsLoading] = useState(true);

  // Busca os dados das empresas ao montar o componente.
  useEffect(() => {
    async function loadEmpresas() {
      try {
        const data = await fetchEmpresas(); // Faz a requisição para buscar empresas.
        setEmpresas(data); // Atualiza o estado com os dados recebidos.
      } catch (error) {
        console.error('Erro ao buscar empresas:', error); // Loga o erro no console.
      } finally {
        setIsLoading(false); // Finaliza o estado de carregamento.
      }
    }

    loadEmpresas(); // Executa a função de busca.
  }, []); // Executa apenas uma vez, ao montar o componente.

  // Filtra a lista de empresas com base no termo de busca.
  const filteredEmpresas = filterEmpresas(empresas, searchTerm);

  // Exibe um indicador de carregamento enquanto os dados estão sendo buscados.
  if (isLoading) {
    return <div>Carregando...</div>;
  }

  // Renderiza a interface da página.
  return (
    <div className="container mx-auto p-4">
      {/* Barra de navegação com campo de busca */}
      <AppBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      {/* Lista de empresas filtradas */}
      <EmpresaList
        empresas={filteredEmpresas} // Passa as empresas filtradas para o componente.
        onClick={(id: number) => {
          // Redireciona para a página de detalhes da empresa ao clicar.
          window.location.href = `/empresa/detalhesEmpresa?id=${id}`;
        }}
      />
    </div>
  );
}