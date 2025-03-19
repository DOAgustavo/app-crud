import { useState, useEffect } from "react";
import { LicencaForm } from "../types/Licenca";
// Define a interface para o formulário de licença.


// Define o hook customizado `useEditarLicenca`.
export function useEditarLicenca(id: string | string[] | undefined) {
  // Estado para armazenar os dados do formulário.
  const [form, setForm] = useState<LicencaForm>({
    numero: "",
    orgaoAmbiental: "",
    emissao: "",
    validade: "",
  });

  // Estado para controlar o carregamento dos dados.
  const [loading, setLoading] = useState(true);

  // Estado para armazenar mensagens de erro, caso ocorram.
  const [error, setError] = useState<string | null>(null);

  // Efeito para carregar os dados da licença ao montar o componente ou quando o `id` muda.
  useEffect(() => {
    if (id) {
      fetch(`/api/licenca/${id}`) // Faz uma requisição GET para buscar os dados da licença.
        .then((res) => {
          if (!res.ok) {
            // Lança um erro se a resposta da API não for bem-sucedida.
            throw new Error("Erro ao carregar licença.");
          }
          return res.json(); // Converte a resposta para JSON.
        })
        .then((data) => {
          // Atualiza o estado do formulário com os dados recebidos.
          setForm({
            numero: data.numero,
            orgaoAmbiental: data.orgaoAmbiental,
            emissao: data.emissao.split("T")[0], // Formata a data para o input.
            validade: data.validade.split("T")[0], // Formata a data para o input.
          });
          setLoading(false); // Define o estado de carregamento como concluído.
        })
        .catch((err) => {
          // Trata erros que possam ocorrer durante a requisição.
          console.error("Erro ao carregar licença:", err);
          setError("Não foi possível carregar os dados da licença."); // Define a mensagem de erro.
          setLoading(false); // Define o estado de carregamento como concluído.
        });
    }
  }, [id]); // O efeito é executado sempre que o `id` muda.

  // Função para atualizar os valores do formulário ao alterar os campos.
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target; // Obtém o nome e o valor do campo alterado.
    setForm({ ...form, [name]: value }); // Atualiza o estado do formulário com o novo valor.
  };

  // Função para enviar os dados atualizados para a API.
  const handleSubmit = async () => {
    try {
      const res = await fetch(`/api/licenca/${id}`, {
        method: "PUT", // Método HTTP para atualizar os dados.
        headers: {
          "Content-Type": "application/json", // Define o tipo de conteúdo como JSON.
        },
        body: JSON.stringify(form), // Converte os dados do formulário para JSON.
      });

      if (!res.ok) {
        // Lança um erro se a resposta da API não for bem-sucedida.
        throw new Error("Erro ao atualizar licença.");
      }

      return true; // Retorna sucesso.
    } catch (err) {
      // Trata erros que possam ocorrer durante o envio dos dados.
      console.error("Erro ao atualizar licença:", err);
      setError("Não foi possível atualizar a licença."); // Define a mensagem de erro.
      return false; // Retorna falha.
    }
  };

  // Retorna os dados e funções gerenciados pelo hook.
  return { form, loading, error, handleChange, handleSubmit };
}