import { useState } from "react";
import { useRouter } from "next/router";
import { createEmpresa } from "../services/empresaService"; // Serviço responsável por criar uma empresa na API

// Função para validar o CNPJ

function validarCNPJ(cnpj: string): boolean {
  // Remove caracteres não numéricos do CNPJ
  cnpj = cnpj.replace(/[^\d]+/g, "");
  return cnpj.length === 14; // Retorna true se o CNPJ tiver 14 dígitos
}
// Função para validar o CEP
function validarCEP(cep: string): boolean {
  const regex = /^\d{5}-\d{3}$/; // Expressão regular para verificar o formato 00000-000
  return regex.test(cep); // Retorna true se o CEP for válido
}

// Função para formatar o CNPJ


// Função para formatar o CEP
function formatarCEP(cep: string): string {
  // Remove caracteres não numéricos do CEP
  cep = cep.replace(/[^\d]+/g, "");

  // Aplica a formatação ao CEP (ex.: 12345-678)
  return cep.replace(/^(\d{5})(\d)/, "$1-$2");
}

// Hook personalizado para gerenciar o cadastro de empresas
export function useCadastroEmpresa() {
  // Estado para armazenar os dados do formulário
  const [form, setForm] = useState({
    razaoSocial: "",
    cnpj: "",
    cep: "",
    cidade: "",
    estado: "",
    bairro: "",
    complemento: "",
  });

  const router = useRouter(); // Hook do Next.js para redirecionamento

  // Função para atualizar os campos do formulário com formatação
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target; // Obtém o nome e o valor do campo alterado

    let formattedValue = value;

    // Aplica a formatação para   CEP
     if (name === "cep") {
      formattedValue = formatarCEP(value);
    }

    // Atualiza o estado do formulário com o valor formatado
    setForm({ ...form, [name]: formattedValue });
  };

  // Função para validar os campos obrigatórios e enviar o formulário
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Evita o comportamento padrão do formulário

    // Lista de campos obrigatórios
    const requiredFields = ["razaoSocial", "cnpj", "cep", "cidade", "estado", "bairro"];
    const emptyFields = requiredFields.filter((field) => !form[field as keyof typeof form]);

    // Verifica se há campos obrigatórios não preenchidos
    if (emptyFields.length > 0) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    // Validação do CNPJ
    if (!validarCNPJ(form.cnpj)) {
      alert("CNPJ inválido!");
      return;
    }

    // Validação do CEP
    if (!validarCEP(form.cep)) {
      alert("CEP inválido!");
      return;
    }

    try {
      // Envia os dados para a API
      await createEmpresa(form);

      // Redireciona para a página inicial após o sucesso
      router.push("/");
    } catch (error) {
      console.error("Erro ao criar empresa:", error); // Loga o erro no console
      alert("Erro ao criar empresa. Tente novamente."); // Exibe uma mensagem de erro ao usuário
    }
  };

  // Retorna o estado e as funções para serem usadas no componente
  return { form, handleChange, handleSubmit };
}