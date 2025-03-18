# Desafio Desenvolvedor Full Stack - Next.js

Este projeto é um CRUD simples desenvolvido com **Next.js**, **MySQL** e **Prisma.js**. Ele permite gerenciar empresas e suas licenças ambientais.

---

## **Tecnologias Utilizadas**

- **Next.js**: Framework React para desenvolvimento web.
- **TypeScript**: Linguagem para tipagem estática.
- **MySQL**: Banco de dados relacional.
- **Prisma.js**: ORM para interação com o banco de dados.
- **Bootstrap**: Biblioteca CSS para estilização.

---

## **Requisitos**

Certifique-se de ter as seguintes ferramentas instaladas:

- **Node.js** (versão 16 ou superior)
- **npm** ou **yarn**
- **MySQL** (local ou remoto)
- **XAMPP** (para configurar o MySQL localmente)
- **Git** (para clonar o repositório)

---

## **Instalação**

### **1. Clonar o Repositório**
1. Abra o terminal ou prompt de comando.
2. Clone o repositório do projeto:
   ```bash
   git clone https://github.com/DOAgustavo/app-crud.git
   ```
3. Acesse a pasta do projeto:
   ```bash
   cd seu-repositorio
   ```

---

### **2. Instalar Dependências**
1. Instale as dependências do projeto:
   ```bash
   npm install
   # ou
   yarn install
   ```

---

### **3. Configurar o Banco de Dados com XAMPP**
1. Abra o XAMPP e inicie o serviço **MySQL**.
2. Acesse o **phpMyAdmin** no navegador:
   ```
   http://localhost/phpmyadmin
   ```
3. Crie um banco de dados chamado `app_crud`:
   - No phpMyAdmin, clique em **Novo**.
   - Insira o nome do banco de dados como `app_crud` e clique em **Criar**.
4. Configure o arquivo `.env`:
   - Renomeie o arquivo `.env.example` para `.env`:
     ```bash
     mv .env.example .env
     ```
   - Edite o arquivo `.env` e configure a variável `DATABASE_URL` com as credenciais do MySQL. Exemplo:
     ```env
     DATABASE_URL="mysql://root:senha@localhost:3306/app_crud"
     ```
     - Substitua `senha` pela senha configurada no MySQL (no XAMPP, a senha padrão é geralmente vazia, mas pode ser configurada).

---

### **4. Configurar o Prisma**
1. Gere os arquivos do Prisma com base no modelo de dados:
   ```bash
   npx prisma generate
   ```
2. Execute as migrações para criar as tabelas no banco de dados:
   ```bash
   npx prisma migrate dev
   ```

---

### **5. Executar o Servidor**
1. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   # ou
   yarn dev
   ```
2. Acesse o aplicativo no navegador:
   ```
   http://localhost:3000
   ```

---

### **6. Scripts para Cadastrar Empresas e Licenças**
O projeto inclui scripts para cadastrar empresas e licenças no banco de dados automaticamente.

1. **Cadastrar Empresas**:
   - Execute o seguinte comando no terminal:
     ```bash
     npx ts-node --project tsconfig.scripts.json prisma/scripts/createEmpresas.ts
     ```
   - Isso criará empresas fictícias no banco de dados.

2. **Cadastrar Licenças**:
   - Execute o seguinte comando no terminal:
     ```bash
     npx ts-node --project tsconfig.scripts.json prisma/scripts/createLicencas.ts
     ```
   - Isso criará licenças fictícias associadas às empresas.

---

## **Funcionalidades**

### **Home**
- Lista todas as empresas cadastradas.
- Botão para criar uma nova empresa.

### **Cadastro de Empresa**
- Campos:
  - Razão Social
  - CNPJ
  - CEP
  - Cidade
  - Estado
  - Bairro
  - Complemento
- Lista de licenças ambientais associadas à empresa.
- Botão para adicionar uma nova licença.

### **Cadastro de Licenças**
- Campos:
  - Empresa (campo de seleção)
  - Número
  - Órgão Ambiental
  - Data de Emissão
  - Data de Validade

---




