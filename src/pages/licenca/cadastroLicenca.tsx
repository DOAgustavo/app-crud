"use client";

import { useRouter } from "next/router";
import { useLicenca } from "../hooks/useLicenca";
import LicencaForm from "../../componentes/cadastroLicenca";
import { saveLicenca } from "../../services/licencaService";

export default function CadastroLicenca() {
  const router = useRouter();
  const { empresaId, id: licencaId } = router.query;

  const empresaIdString = Array.isArray(empresaId) ? empresaId[0] : empresaId;
  const licencaIdString = Array.isArray(licencaId) ? licencaId[0] : licencaId;

  // Usa o hook para obter os dados da empresa e do formulário
  const { form, setForm, empresa } = useLicenca(empresaIdString, licencaIdString);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Valida se todos os campos obrigatórios estão preenchidos
    if (!form.numero || !form.orgaoAmbiental || !form.emissao || !form.validade || !form.empresaId) {
      alert("Por favor, preencha todos os campos antes de salvar.");
      return;
    }

    const confirmSave = window.confirm(
      licencaIdString
        ? "Tem certeza de que deseja atualizar esta licença?"
        : "Tem certeza de que deseja salvar esta nova licença?"
    );

    if (!confirmSave) return;

    try {
      await saveLicenca(form, licencaIdString); // Salva ou atualiza a licença
      router.push(`/empresa/detalhesEmpresa?id=${empresaIdString}`); // Redireciona para os detalhes da empresa
    } catch (error) {
      console.error("Erro ao salvar licença:", error);
      alert("Erro ao salvar licença. Tente novamente.");
    }
  };

  const handleCancel = () => {
    router.push(`/empresa/detalhesEmpresa?id=${empresaIdString}`);
  };

  return (
    <div className="container my-3 p-3 bg-white rounded shadow-s w-full" style={{ maxWidth: "500px" }}>
      <h1 className="text-2xl font-bold mb-4">
        {licencaIdString ? "Editar Licença Ambiental" : "Nova Licença Ambiental"} -{" "}
       
      </h1>

      <LicencaForm
        form={form}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isEditMode={!!licencaIdString}
      />
    </div>
  );
}