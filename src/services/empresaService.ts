export const createEmpresa = async (form: any) => {
  const response = await fetch('/api/empresa', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(form),
  });

  if (!response.ok) {
    throw new Error('Erro ao criar empresa');
  }

  return response.json();
};