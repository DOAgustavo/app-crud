import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import SaveButton from '../../componentes/buttons/save'; // Importe o SaveButton


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

export default function EditarEmpresa() {
  const [empresa, setEmpresa] = useState<Empresa | null>(null);
  const [editForm, setEditForm] = useState<Empresa | null>(null); // Estado para o formulário editável
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) return;

    async function fetchEmpresa() {
      try {
        const response = await fetch(`/api/empresa/${id}`);
        if (!response.ok) {
          throw new Error('Erro ao buscar empresa');
        }
        const data: Empresa = await response.json();
        setEmpresa(data);
        setEditForm(data); // Inicializa o formulário com os dados da empresa
      } catch (error) {
        console.error('Erro ao buscar empresa:', error);
        setEmpresa(null);
      } finally {
        setLoading(false);
      }
    }

    fetchEmpresa();
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditForm((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (!empresa || !editForm) {
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
      <h1>Editar Empresa</h1>
      <form>
        <div className="mb-3">
          <label><strong>Razão Social:</strong></label>
          <input
            type="text"
            name="razaoSocial"
            className="form-control"
            value={editForm.razaoSocial}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label><strong>CNPJ:</strong></label>
          <input
            type="text"
            name="cnpj"
            className="form-control"
            value={editForm.cnpj}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label><strong>CEP:</strong></label>
          <input
            type="text"
            name="cep"
            className="form-control"
            value={editForm.cep}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label><strong>Cidade:</strong></label>
          <input
            type="text"
            name="cidade"
            className="form-control"
            value={editForm.cidade}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label><strong>Estado:</strong></label>
          <input
            type="text"
            name="estado"
            className="form-control"
            value={editForm.estado}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label><strong>Bairro:</strong></label>
          <input
            type="text"
            name="bairro"
            className="form-control"
            value={editForm.bairro}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label><strong>Complemento:</strong></label>
          <input
            type="text"
            name="complemento"
            className="form-control"
            value={editForm.complemento}
            onChange={handleInputChange}
          />
        </div>
        {/* Substituí o botão "Salvar" pelo SaveButton */}
        <div style={{ display:'flex',gap:'10px'}}><SaveButton
          id={empresa.id}
          editForm={editForm}
          setEmpresa={setEmpresa}
          onSuccess={() => router.push(`/empresa/detalhesEmpresa?id=${empresa.id}`)} // Redireciona após salvar
        />
       <button
  type="button"
  className="btn btn-secondary btn-sm w-auto"
  onClick={() => router.back()}
>
  Voltar
</button></div>
      </form>
    </div>
  );
}