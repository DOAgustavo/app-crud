import React, { useEffect, useState } from 'react';

type Licenca = {
  id: number;
  numero: string;
  orgaoAmbiental: string;
  emissao: string;
  validade: string;
};

type ListLicencaProps = {
  empresaId: number; // ID da empresa para buscar as licenças
  onExcluir: (licencaId: number) => void; // Função chamada ao clicar no botão "Excluir"
};

const ListLicenca: React.FC<ListLicencaProps> = ({ empresaId, onExcluir }) => {
  const [licencas, setLicencas] = useState<Licenca[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLicencas = async () => {
      try {
        const response = await fetch(`/api/licenca?empresaId=${empresaId}`);
        if (!response.ok) {
          throw new Error('Erro ao buscar licenças');
        }
        const data = await response.json();
        setLicencas(data);
      } catch (error) {
        console.error('Erro ao buscar licenças:', error);
        setError('Erro ao buscar licenças. Tente novamente mais tarde.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchLicencas();
  }, [empresaId]);

  if (isLoading) {
    return <p>Carregando licenças...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (licencas.length === 0) {
    return <p>Nenhuma licença encontrada para esta empresa.</p>;
  }

  return (
    <div className="mt-4 bg-white ">
      {licencas.map((licenca) => (
        <div
          key={licenca.id}
          className="flex justify-between items-center mb-4 p-4 border rounded shadow-sm"
        >
          <span>
            {licenca.numero} - {licenca.orgaoAmbiental}
          </span>
          <button 
            style={{
              backgroundColor: 'red',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '4px',
              border: 'none',
              cursor: 'pointer',
            }}
            onClick={() => onExcluir(licenca.id)}
          >
            Excluir
          </button>
        </div>
      ))}
    </div>
  );
};

export default ListLicenca;