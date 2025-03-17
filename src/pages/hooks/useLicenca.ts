import { useState, useEffect } from "react";
import { fetchEmpresaData, fetchLicencaData } from "../../services/licencaService";

export const useLicenca = (empresaId: string | undefined, licencaId: string | undefined) => {
  const [form, setForm] = useState({
    numero: "",
    orgaoAmbiental: "",
    emissao: "",
    validade: "",
    empresaId: empresaId || "", // Garante que o ID da empresa seja inicializado
  });
  const [empresa, setEmpresa] = useState(null); // Estado para armazenar os dados da empresa

  useEffect(() => {
    // Busca os dados da empresa
    if (empresaId) {
      fetchEmpresaData(empresaId)
        .then(setEmpresa) // Atualiza o estado com os dados da empresa
        .catch((error) => console.error("Erro ao buscar empresa:", error));
    }

    // Busca os dados da licença, se houver um ID de licença
    if (licencaId) {
      fetchLicencaData(licencaId)
        .then((data) =>
          setForm({
            numero: data.numero,
            orgaoAmbiental: data.orgaoAmbiental,
            emissao: data.emissao.split("T")[0],
            validade: data.validade.split("T")[0],
            empresaId: data.empresaId.toString(),
          })
        )
        .catch((error) => console.error("Erro ao buscar licença:", error));
    }
  }, [empresaId, licencaId]);

  return { form, setForm, empresa }; // Retorna o estado da empresa
};