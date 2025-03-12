-- CreateTable
CREATE TABLE "Empresa" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "razaoSocial" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "complemento" TEXT
);

-- CreateTable
CREATE TABLE "LicencaAmbiental" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "numero" TEXT NOT NULL,
    "orgaoAmbiental" TEXT NOT NULL,
    "emissao" DATETIME NOT NULL,
    "validade" DATETIME NOT NULL,
    "empresaId" INTEGER NOT NULL,
    CONSTRAINT "LicencaAmbiental_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
