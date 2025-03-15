import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ExcluirButton from '../../componentes/buttons/excluir';

interface Empresa {
  id: number;
  razaoSocial: string;
  cnpj: string;
  cep: string;
  cidade: string;
  estado: string;
  bairro: string;
  complemento: string;
}

export default function DetalhesEmpresa() {
  const [empresa, setEmpresa] = useState<Empresa | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) return;

    async function fetchEmpresa() {
      try {
        const response = await fetch(`/api/empresa/${id}`);
        const data: Empresa = await response.json();
        setEmpresa(data);
      } catch (error) {
        console.error('Erro ao buscar empresa:', error);
        setEmpresa(null);
      } finally {
        setLoading(false);
      }
    }

    fetchEmpresa();
  }, [id]);

  const handleExcluir = async () => {
    const confirm = window.confirm('Tem certeza que deseja excluir esta empresa?');
    if (!confirm) return;

    try {
      const response = await fetch(`/api/empresa/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Empresa excluída com sucesso!');
        router.push('/empresa'); // Redireciona para a lista de empresas
      } else {
        alert('Erro ao excluir a empresa.');
      }
    } catch (error) {
      console.error('Erro ao excluir empresa:', error);
    }
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (!empresa) {
    return <p>Empresa não encontrada.</p>;
  }

  return (
    <div
      style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        maxWidth: '600px',
        margin: '20px auto',
      }}
    >
      <h1>Detalhes da Empresa</h1>
      <p><strong>Razão Social:</strong> {empresa.razaoSocial}</p>
      <p><strong>CNPJ:</strong> {empresa.cnpj}</p>
      <p><strong>CEP:</strong> {empresa.cep}</p>
      <p><strong>Cidade:</strong> {empresa.cidade}</p>
      <p><strong>Estado:</strong> {empresa.estado}</p>
      <p><strong>Bairro:</strong> {empresa.bairro}</p>
      <p><strong>Complemento:</strong> {empresa.complemento}</p>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        {/* Botão Cadastrar Licença */}
        <button
          className="btn btn-success"
          onClick={() => router.push(`/cadastros/cadastroLicenca?empresaId=${empresa.id}`)}
        >
          Cadastrar Licença
        </button>

        <div style={{ display: 'flex', gap: '10px' }}>
          {/* Botão Editar */}
          <button
            className="btn btn-primary"
            onClick={() => router.push(`/empresa/editarEmpresa?id=${empresa.id}`)}
          >
            Editar
          </button>

          {/* Botão Voltar */}
          <button
            className="btn btn-secondary"
            onClick={() => router.push('http://localhost:3000')}
          >
            Voltar
          </button>

          {/* Botão Excluir */}
         
      {/* Outros elementos */}
      <ExcluirButton id={empresa.id} redirectUrl="http://localhost:3000/" />
    
        </div>
      </div>
    </div>
  );
}