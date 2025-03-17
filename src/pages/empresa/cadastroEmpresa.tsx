"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";
import { createEmpresa } from "../../services/empresaService";

export default function CadastroEmpresa() {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const requiredFields = ["razaoSocial", "cnpj", "cep", "cidade", "estado", "bairro"];
    const emptyFields = requiredFields.filter((field) => !form[field as keyof typeof form]);

    if (emptyFields.length > 0) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    try {
      await createEmpresa(form);
      router.push("/");
    } catch (error) {
      console.error("Erro ao criar empresa:", error);
      alert("Erro ao criar empresa. Tente novamente.");
    }
  };

  const renderInput = (label: string, name: string, required = true) => (
    <div className="col-12 col-md-6">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input
        type="text"
        className="form-control form-control-sm"
        id={name}
        name={name}
        value={form[name as keyof typeof form]}
        onChange={handleChange}
        required={required}
      />
      {required && <div className="invalid-feedback">Por favor, forneça um {label.toLowerCase()} válido.</div>}
    </div>
  );

  return (
    <div className="d-flex align-items-center justify-content-center vh-100  ">
      <div className="container-fluid p-4 bg-white shadow-md rounded" style={{ maxWidth: "500px" }}>
        <h1 className="text-center mb-4">Nova Empresa</h1>
        <form onSubmit={handleSubmit} className="row g-3 needs-validation" noValidate>
          {renderInput("Razão Social", "razaoSocial")}
          {renderInput("CNPJ", "cnpj")}
          {renderInput("CEP", "cep")}
          {renderInput("Cidade", "cidade")}
          {renderInput("Estado", "estado")}
          {renderInput("Bairro", "bairro")}
          {renderInput("Complemento", "complemento", false)}
          <div className="col-12">
            <button className="btn btn-primary w-100" type="submit">
              Salvar
            </button>
          </div>
          <div className="col-12 mt-3">
            <Link href="/" legacyBehavior>
              <a className="btn btn-secondary w-100 text-center">Voltar para a Página Principal</a>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}