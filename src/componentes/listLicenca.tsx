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
    return (
      <div className="mt-4 d-flex justify-content-center">
        <p style={{ color: 'white' }}>Nenhuma licença encontrada para esta empresa.</p>
      </div>
    );
  }

  return (
    <div className="mt-4 d-flex justify-content-center">
    <select
      className="form-select w-auto"
      style={{
        maxWidth: '300px', // Define uma largura máxima
      }}
      size={5} // Mostra até 5 opções visíveis e ativa o scroll
      onChange={(e) => {
        const selectedId = Number(e.target.value);
        console.log(`Licença selecionada: ${selectedId}`);
      }}
    >
      <option value="" disabled>
        Selecione uma licença
      </option>
      {licencas.map((licenca) => (
        <option key={licenca.id} value={licenca.id}>
          {licenca.numero} - {licenca.orgaoAmbiental}
        </option>
      ))}
    </select>
  </div>
  );
};

export default ListLicenca;