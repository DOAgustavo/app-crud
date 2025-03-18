#  Desenvolvimento Full Stack - Next.js

Este projeto é um CRUD simples desenvolvido com **Next.js**, **MySQL** e **Prisma.js**. Ele permite gerenciar empresas e suas licenças ambientais.

---

## **Tecnologias Utilizadas**

- **Next.js**: Framework React para desenvolvimento web.
- **TypeScript**: Linguagem para tipagem estática.
- **MySQL**: Banco de dados relacional.
- **Prisma.js**: ORM para interação com o banco de dados.
- **Bootstrap**: Biblioteca CSS para estilização.
- **Axios**: Biblioteca para requisições HTTP.

---

## **Requisitos**

Certifique-se de ter as seguintes ferramentas instaladas no seu computador:

1. **Node.js** (versão 16 ou superior)
   - [Download Node.js](https://nodejs.org/)
   - O Node.js inclui o gerenciador de pacotes **npm**.

2. **Git** (para clonar o repositório)
   - [Download Git](https://github.com/DOAgustavo/app-crud.git)

3. **XAMPP** (para configurar o MySQL localmente)
   - [Download XAMPP](https://www.apachefriends.org/pt_br/index.html)
   - O XAMPP será usado para rodar o servidor MySQL.
   - Ou outra opção que você desejar.

4. **Editor de Código** (recomendado: Visual Studio Code)
   - [Download VS Code](https://code.visualstudio.com/)

---

## **Passo a Passo para Configuração**

### **1. Clonar o Repositório**
1. Abra o terminal ou prompt de comando.
2. Clone o repositório do projeto:
   ```bash
   git clone https://github.com/DOAgustavo/app-crud.git
   ```
   ![git clone print](prints/gitclone.png)

3. Acesse a pasta do projeto:
   ```bash
   cd seu-repositorio
   ```

---

### **2. Instalar Dependências**
1. Certifique-se de que o **Node.js** e o **npm** estão instalados corretamente:
   ```bash
   node -v
   npm -v
   ```
   Esses comandos devem retornar as versões instaladas do Node.js e npm.

2. Instale todas as dependências do projeto:
   ```bash
   npm install
   ```

3. Instale o **Axios** (caso ainda não esteja instalado):
   ```bash
   npm install axios
   ```
4. Instale o **Bootstrap** (caso ainda não estejam instalados):
   ```bash
   npm install bootstrap


---

### **3. Configurar o Banco de Dados com XAMPP**
1. Abra o **XAMPP Control Panel**.
2. Inicie o serviço **MySQL** clicando no botão **Start**.

3. Crie um banco de dados chamado `app_crud`:

   - **Opção 1: Pelo phpMyAdmin**
     - No phpMyAdmin, clique em **Novo**.
     - Insira o nome do banco de dados como `app_crud` e clique em **Criar**.

   - **Opção 2: Pelo Terminal**
     1. Abra o terminal ou o Shell do XAMPP.
     2. Conecte-se ao MySQL:
        - Sem senha configurada:
          ```bash
          mysql -u root
          ```
        - Com senha configurada:
          ```bash
          mysql -u root -p
          ```
     3. Crie o banco de dados:
        ```sql
        CREATE DATABASE app_crud;
        ```
     4. Verifique se o banco foi criado:
        ```sql
        SHOW DATABASES;
        ```

   - **Opção 3: Pelo Prisma**
     1. Certifique-se de que o arquivo [.env](http://_vscodecontentref_/1) está configurado corretamente:
        ```env
        DATABASE_URL="mysql://root:@localhost:3306/app_crud"
        ou 
        DATABASE_URL="mysql://root:senha@localhost:3306/app_crud"
        ```
     2. Execute o comando de migração inicial:
        ```bash
        npx prisma migrate dev --name init
        ```
     3. O Prisma criará automaticamente o banco de dados e as tabelas.
---

### **4. Configurar o Arquivo `.env`**
1. No diretório do projeto, localize o arquivo `.env.example` e renomeie-o para `.env`:
   ```bash
   mv .env.example .env
   ```

2. Edite o arquivo `.env` e configure a variável `DATABASE_URL` com as credenciais do MySQL. Exemplo:
   ```env
   DATABASE_URL="mysql://root:@localhost:3306/app_crud"
  
   ```
   - `root`: Usuário padrão do MySQL.
   - `@localhost`: Indica que o banco está rodando localmente.
   - `3306`: Porta padrão do MySQL.
   - `app_crud`: Nome do banco de dados.

   > **Nota**: Se você configurou uma senha para o MySQL, insira-a após `root:`. Exemplo:
   > ```env
   > DATABASE_URL="mysql://root:senha@localhost:3306/app_crud"
   > ```

---

### **5. Configurar o Prisma**
1. Instale o Prisma como dependência de desenvolvimento:
   ```bash
   npm install prisma --save-dev
   ```

2. Gere os arquivos do Prisma com base no modelo de dados definido no arquivo `schema.prisma`:
   ```bash
   npx prisma generate
   ```

3. Execute a migração inicial para criar as tabelas no banco de dados:
   ```bash
   npx prisma migrate dev --name init
   ```

4. Verifique se as tabelas foram criadas no banco de dados:
   - Conecte ao MySQL pelo Shell do XAMPP:
     ```bash
     mysql -u root
     ```
   - Use o banco de dados `app_crud`:
     ```sql
     USE app_crud;
     ```
   - Liste as tabelas:
     ```sql
     SHOW TABLES;
     ```
   - Você deve ver as tabelas `empresa` e `licenca` listadas.

---

### **6. Scripts para Popular o Banco de Dados**
O projeto inclui scripts para cadastrar empresas e licenças fictícias no banco de dados.

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

### **7. Executar o Servidor**
1. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

2. Acesse o aplicativo no navegador:
   ```
   http://localhost:3000
   ```

3. Verifique se as empresas e licenças cadastradas aparecem corretamente na interface.

---

### **8. Testar o Projeto**
1. **Home**:
   - Verifique se a lista de empresas é exibida.
   - Teste o botão para criar uma nova empresa.
   <img src="prints/home.png" alt="page home" width="600">
   <img src="prints/homeEmpresas.png" alt="page home com empresas cadastradas" width="600">

2. **Cadastro de Empresa**:
   - Preencha os campos obrigatórios (Razão Social, CNPJ, etc.).
   - Verifique se a lista de licenças ambientais aparece abaixo dos campos.
   - Teste o botão para adicionar uma nova licença.
   <img src="prints/cadastroEmpresa.png" alt="page cadastro empresa" width="600">

3. **Cadastro de Licenças**:
   - Preencha os campos obrigatórios (Empresa, Número, Órgão Ambiental, etc.).
   - Verifique se a licença é salva corretamente e aparece na lista.
   <img src="prints/cadastroLicenca.png" alt="page cadastro Licenca" width="600">


   
---

