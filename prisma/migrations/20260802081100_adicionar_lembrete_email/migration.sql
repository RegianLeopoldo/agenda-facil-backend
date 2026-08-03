-- AlterTable
ALTER TABLE "Compromisso" ADD COLUMN     "lembreteEnviado" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "lembreteMinutos" INTEGER NOT NULL DEFAULT 30;
