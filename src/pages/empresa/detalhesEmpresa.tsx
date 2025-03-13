import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

type Empresa = {
  id: number;
  razaoSocial: string;
  cnpj: string;
  endereco: string;
};

export default function DetalhesEmpresa() {
  const router = useRouter();
  const { id } = router.query; // Obtém o ID da empresa da URL
  const [empresa, setEmpresa] = useState<Empresa | null>(null);

  useEffect(() => {
    if (!id) return; // Aguarda o ID estar disponível

    async function fetchEmpresa() {
      try {
        const response = await fetch(`/api/empresa/${id}`);
        if (!response.ok) {
          throw new Error('Erro ao buscar empresa');
        }
        const data = await response.json();
        setEmpresa(data);
      } catch (error) {
        console.error('Erro ao buscar empresa:', error);
      }
    }

    fetchEmpresa();
  }, [id]);

  if (!empresa) {
    return <div>Carregando...</div>; // Exibe "Carregando..." enquanto os dados são buscados
  }

  return (
    <div className="container mx-auto p-4 bg-white shadow-md rounded-lg" style={{ borderRadius: '10px' }}>
      <h1 className="text-2xl font-bold mb-4">Detalhes da Empresa</h1>
      <p><strong>Razão Social:</strong> {empresa.razaoSocial}</p>
      <p><strong>CNPJ:</strong> {empresa.cnpj}</p>
      <p><strong>Endereço:</strong> {empresa.endereco}</p>
      <button
        className="btn btn-primary mt-4"
        onClick={() => router.back()} // Volta para a página anterior
      >
        Voltar
      </button>
    </div>
  );
}