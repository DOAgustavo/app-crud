import { useState } from "react";
import { useRouter } from "next/router";
import { createEmpresa } from "../../services/empresaService"; // Serviço responsável por criar uma empresa na API

// Função para validar o CNPJ
function validarCNPJ(cnpj: string): boolean {
  // Remove caracteres não numéricos
  cnpj = cnpj.replace(/[^\d]+/g, "");

  // Verifica se o CNPJ tem exatamente 14 dígitos
  if (cnpj.length !== 14) return false;

  // Verifica se todos os dígitos são iguais (ex.: 11111111111111 é inválido)
  if (/^(\d)\1+$/.test(cnpj)) return false;

  let tamanho = cnpj.length - 2;
  let numeros = cnpj.substring(0, tamanho);
  let digitos = cnpj.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;

  // Calcula o primeiro dígito verificador
  for (let i = tamanho; i >= 1; i--) {
    soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2) pos = 9;
  }

  let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado !== parseInt(digitos.charAt(0))) return false;

  // Calcula o segundo dígito verificador
  tamanho++;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;

  for (let i = tamanho; i >= 1; i--) {
    soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2) pos = 9;
  }

  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  return resultado === parseInt(digitos.charAt(1));
}

// Função para validar o CEP
function validarCEP(cep: string): boolean {
  const regex = /^\d{5}-\d{3}$/; // Expressão regular para verificar o formato 00000-000
  return regex.test(cep); // Retorna true se o CEP for válido
}

// Função para formatar o CNPJ
function formatarCNPJ(cnpj: string): string {
  // Remove caracteres não numéricos do CNPJ
  cnpj = cnpj.replace(/[^\d]+/g, "");

  // Aplica a formatação ao CNPJ (ex.: 12.345.678/0001-95)
  return cnpj
    .replace(/^(\d{2})(\d)/, "$1.$2") // Adiciona o primeiro ponto
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3") // Adiciona o segundo ponto
    .replace(/\.(\d{3})(\d)/, ".$1/$2") // Adiciona a barra
    .replace(/(\d{4})(\d)/, "$1-$2"); // Adiciona o traço
}

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

    // Aplica a formatação para CNPJ e CEP
    if (name === "cnpj") {
      formattedValue = formatarCNPJ(value);
    } else if (name === "cep") {
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