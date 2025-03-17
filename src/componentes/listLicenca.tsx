import React, { useEffect, useState } from 'react';
// Importa o React e os hooks `useEffect` e `useState` para gerenciar o estado e os efeitos colaterais.

type Licenca = {
  id: number;
  numero: string;
  orgaoAmbiental: string;
  emissao: string;
  validade: string;
};
// Define o tipo `Licenca` com as propriedades esperadas para cada licença.

interface ListLicencaProps {
  empresaId: number; // ID da empresa para buscar as licenças associadas.
}
// Define as propriedades esperadas pelo componente `ListLicenca`.

const ListLicenca: React.FC<ListLicencaProps> = ({ empresaId }) => {
  const [licencas, setLicencas] = useState<Licenca[]>([]);
  // Estado para armazenar a lista de licenças.

  const [isLoading, setIsLoading] = useState(true);
  // Estado para controlar o carregamento.

  const [error, setError] = useState<string | null>(null);
  // Estado para armazenar mensagens de erro.

  useEffect(() => {
    const fetchLicencas = async () => {
      // Função assíncrona para buscar as licenças associadas à empresa.
      try {
        const response = await fetch(`/api/licenca?empresaId=${empresaId}`);
        // Faz a requisição para buscar as licenças associadas à empresa.

        if (!response.ok) {
          throw new Error('Erro ao buscar licenças');
          // Lança um erro se a resposta não for bem-sucedida.
        }

        const data = await response.json();
        // Converte a resposta em JSON.

        setLicencas(data);
        // Atualiza o estado com os dados das licenças.
      } catch (error) {
        console.error('Erro ao buscar licenças:', error);
        // Loga o erro no console para depuração.

        setError('Erro ao buscar licenças. Tente novamente mais tarde.');
        // Define uma mensagem de erro para exibição ao usuário.
      } finally {
        setIsLoading(false);
        // Finaliza o estado de carregamento.
      }
    };

    fetchLicencas();
    // Chama a função para buscar as licenças.
  }, [empresaId]);
  // Dependência do efeito: será executado sempre que o `empresaId` mudar.

  if (isLoading) {
    // Exibe uma mensagem de carregamento enquanto os dados estão sendo buscados.
    return <p>Carregando licenças...</p>;
  }

  if (error) {
    // Exibe uma mensagem de erro caso ocorra algum problema na busca.
    return <p>{error}</p>;
  }

  if (licencas.length === 0) {
    // Exibe uma mensagem caso não haja licenças associadas à empresa.
    return (
      <div className="mt-4 d-flex justify-content-center">
        <p style={{ color: 'white' }}>Nenhuma licença encontrada para esta empresa.</p>
      </div>
    );
  }

  return (
    <div className="mt-4 d-flex justify-content-center">
      {/* Contêiner que centraliza o dropdown na página. */}
      <select
        className="form-select w-auto"
        style={{
          maxWidth: '300px', // Define uma largura máxima para o dropdown.
        }}
        size={5} // Mostra até 5 opções visíveis e ativa o scroll.
        onChange={(e) => {
          const selectedId = Number(e.target.value);
          // Obtém o ID da licença selecionada no dropdown.

          console.log(`Licença selecionada: ${selectedId}`);
          // Loga o ID da licença selecionada no console.
        }}
      >
        <option value="" disabled>
          Selecione uma licença
        </option>
        {/* Opção padrão desabilitada para instruir o usuário a selecionar uma licença. */}
        {licencas.map((licenca) => (
          <option key={licenca.id} value={licenca.id}>
            {licenca.numero} - {licenca.orgaoAmbiental}
            {/* Exibe o número e o órgão ambiental da licença como texto da opção. */}
          </option>
        ))}
        {/* Mapeia a lista de licenças e renderiza cada uma como uma opção no dropdown. */}
      </select>
    </div>
  );
};

export default ListLicenca;
// Exporta o componente `ListLicenca` como padrão.