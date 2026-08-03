-- CreateTable
CREATE TABLE "Notificacao" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "mensagem" TEXT NOT NULL,
    "lida" BOOLEAN NOT NULL DEFAULT false,
    "criadaEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usuarioId" INTEGER NOT NULL,
    "compromissoId" INTEGER,

    CONSTRAINT "Notificacao_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Notificacao" ADD CONSTRAINT "Notificacao_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notificacao" ADD CONSTRAINT "Notificacao_compromissoId_fkey" FOREIGN KEY ("compromissoId") REFERENCES "Compromisso"("id") ON DELETE CASCADE ON UPDATE CASCADE;
