/*
  Warnings:

  - Added the required column `usuarioId` to the `Compromisso` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Compromisso" ADD COLUMN     "usuarioId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nome" TEXT,
    "email" TEXT NOT NULL,
    "imagem" TEXT,
    "provider" TEXT,
    "providerId" TEXT,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_providerId_key" ON "Usuario"("providerId");

-- AddForeignKey
ALTER TABLE "Compromisso" ADD CONSTRAINT "Compromisso_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;
