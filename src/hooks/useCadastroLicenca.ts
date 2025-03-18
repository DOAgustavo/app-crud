import { useState, useEffect } from "react";

interface Empresa {
  id: number;
  razaoSocial: string;
}

interface FormState {
  empresaId: string;
  numero: string;
  orgaoAmbiental: string;
  emissao: string;
  validade: string;
}

export function useCadastroLicenca(empresaId?: string | string[]) {
  const [empresas, setEmpresas] = useState<Empresa[]>([]); // Estado para armazenar as empresas.
  const [form, setForm] = useState<FormState>({
    empresaId: Array.isArray(empresaId) ? empresaId[0] : empresaId || "", // Define o `empresaId` inicial, se disponível.
    numero: "",
    orgaoAmbiental: "",
    emissao: "",
    validade: "",
  });
  const [loadingEmpresas, setLoadingEmpresas] = useState(true); // Estado para controlar o carregamento das empresas.

  // Busca as empresas disponíveis ao montar o componente.
  useEffect(() => {
    async function fetchEmpresas() {
      try {
        const res = await fetch("/api/empresa");
        if (!res.ok) {
          throw new Error("Erro ao buscar empresas.");
        }
        const data = await res.json();
        setEmpresas(data); // Atualiza o estado com a lista de empresas.
        setLoadingEmpresas(false);
      } catch (error) {
        console.error("Erro ao buscar empresas:", error);
        setLoadingEmpresas(false);
      }
    }

    fetchEmpresas();
  }, []);

  // Atualiza os valores do formulário ao alterar os campos.
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Retorna os dados e funções gerenciados pelo hook.
  return { empresas, form, loadingEmpresas, handleChange, setForm };
}