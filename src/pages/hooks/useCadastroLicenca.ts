import { useState } from "react";
import { useRouter } from "next/router";
import { saveLicenca } from "../../services/licencaService";

export function useCadastroLicenca(empresaIdString: string | undefined) {
  const [form, setForm] = useState({
    numero: "",
    orgaoAmbiental: "",
    emissao: "",
    validade: "",
    empresaId: empresaIdString || "",
  });

  const router = useRouter();

  // Função para salvar a licença
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validação dos campos obrigatórios
    if (!form.numero || !form.orgaoAmbiental || !form.emissao || !form.validade || !form.empresaId) {
      alert("Por favor, preencha todos os campos antes de salvar.");
      return;
    }

    const confirmSave = window.confirm("Tem certeza de que deseja salvar esta nova licença?");
    if (!confirmSave) return;

    try {
      await saveLicenca(form); // Salva a licença
      router.push(`/empresa/detalhesEmpresa?id=${empresaIdString}`); // Redireciona para os detalhes da empresa
    } catch (error) {
      console.error("Erro ao salvar licença:", error);
      alert("Erro ao salvar licença. Tente novamente.");
    }
  };

  // Função para cancelar e redirecionar para os detalhes da empresa
  const handleCancel = () => {
    router.push(`/empresa/detalhesEmpresa?id=${empresaIdString}`);
  };

  return { form, setForm, handleSubmit, handleCancel };
}