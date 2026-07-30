-- CreateTable
CREATE TABLE "Compromisso" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT,
    "data" TIMESTAMP(3) NOT NULL,
    "horario" TEXT NOT NULL,
    "local" TEXT,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Compromisso_pkey" PRIMARY KEY ("id")
);
