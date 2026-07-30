/*
  Warnings:

  - Made the column `descricao` on table `Compromisso` required. This step will fail if there are existing NULL values in that column.
  - Made the column `local` on table `Compromisso` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Compromisso" ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'PENDENTE',
ALTER COLUMN "descricao" SET NOT NULL,
ALTER COLUMN "local" SET NOT NULL;
