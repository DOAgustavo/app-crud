import { useState } from "react";
import { useRouter } from "next/router";
import { createEmpresa } from "../../services/empresaService";
// Importa as dependências necessárias:
// - `useState` para gerenciar o estado do formulário.
// - `useRouter` para redirecionar o usuário após o cadastro.
// - `createEmpresa` para enviar os dados da empresa para a API.

export function useCadastroEmpresa() {
  // Estado para armazenar os dados do formulário.
  const [form, setForm] = useState({
    razaoSocial: "",
    cnpj: "",
    cep: "",
    cidade: "",
    estado: "",
    bairro: "",
    complemento: "",
  });

  const router = useRouter();
  // Hook do Next.js para manipular a navegação e redirecionar o usuário.

  // Função para atualizar os campos do formulário.
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Atualiza o estado do formulário com base no campo que foi alterado.
  };

  // Função para validar os campos obrigatórios e enviar o formulário.
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Previne o comportamento padrão do formulário (recarregar a página).

    const requiredFields = ["razaoSocial", "cnpj", "cep", "cidade", "estado", "bairro"];
    // Lista de campos obrigatórios que precisam ser preenchidos.

    const emptyFields = requiredFields.filter((field) => !form[field as keyof typeof form]);
    // Verifica quais campos obrigatórios estão vazios.

    if (emptyFields.length > 0) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      // Exibe um alerta se houver campos obrigatórios não preenchidos.
      return;
    }

    try {
      await createEmpresa(form);
      // Envia os dados do formulário para a API para criar a empresa.

      router.push("/");
      // Redireciona o usuário para a página inicial após o sucesso.
    } catch (error) {
      console.error("Erro ao criar empresa:", error);
      // Loga o erro no console para depuração.

      alert("Erro ao criar empresa. Tente novamente.");
      // Exibe uma mensagem de erro para o usuário.
    }
  };

  return { form, handleChange, handleSubmit };
  // Retorna o estado do formulário e as funções para serem usadas no componente.
}