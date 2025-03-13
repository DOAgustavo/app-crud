// filepath: c:\src\app-crud\src\services\fetchEmpresas.ts
export async function fetchEmpresas() {
  try {
    const response = await fetch('/api/empresa');
    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status}`);
    }
    const data = await response.json();
    if (!Array.isArray(data)) {
      throw new Error('Resposta da API não é um array válido.');
    }
    return data;
  } catch (error) {
    console.error('Erro ao buscar empresas:', error);
    return []; // Retorna um array vazio em caso de erro
  }
}