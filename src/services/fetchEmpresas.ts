export async function fetchEmpresas() {
    try {
      const response = await fetch('/api/empresa');
      const data = await response.json();
  
      if (Array.isArray(data)) {
        return data; // Retorna os dados se forem válidos
      } else {
        console.error('Dados recebidos não são um array:', data);
        return [];
      }
    } catch (error) {
      console.error('Erro ao buscar empresas:', error);
      return [];
    }
  }