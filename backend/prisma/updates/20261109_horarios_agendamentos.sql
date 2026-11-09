-- Atualização aditiva para a integração dos commits até 6733b5b.
-- Executar uma vez, em transação, no banco que já tem users/barbearias/barbeiros/servicos.
CREATE TYPE "StatusAgendamento" AS ENUM ('PENDENTE', 'CONFIRMADO', 'CONCLUIDO', 'CANCELADO');

CREATE TABLE "horarios_disponiveis" (
    "id" TEXT NOT NULL,
    "barbeiroId" TEXT NOT NULL,
    "diaSemana" INTEGER NOT NULL,
    "horaInicio" TEXT NOT NULL,
    "horaFim" TEXT NOT NULL,
    "almocoInicio" TEXT,
    "almocoFim" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "horarios_disponiveis_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "agendamentos" (
    "id" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "horario" TEXT NOT NULL,
    "nomeCliente" TEXT NOT NULL,
    "telefoneCliente" TEXT NOT NULL,
    "status" "StatusAgendamento" NOT NULL DEFAULT 'PENDENTE',
    "guestTokenHash" TEXT,
    "lembreteEnviado" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT,
    "barbeariaId" TEXT NOT NULL,
    "barbeiroId" TEXT NOT NULL,
    "servicoId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "agendamentos_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "horarios_disponiveis_barbeiroId_idx" ON "horarios_disponiveis"("barbeiroId");
CREATE INDEX "agendamentos_barbeariaId_data_idx" ON "agendamentos"("barbeariaId", "data");
CREATE INDEX "agendamentos_barbeiroId_data_idx" ON "agendamentos"("barbeiroId", "data");
CREATE INDEX "agendamentos_userId_idx" ON "agendamentos"("userId");

ALTER TABLE "horarios_disponiveis" ADD CONSTRAINT "horarios_disponiveis_barbeiroId_fkey" FOREIGN KEY ("barbeiroId") REFERENCES "barbeiros"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "agendamentos" ADD CONSTRAINT "agendamentos_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "agendamentos" ADD CONSTRAINT "agendamentos_barbeariaId_fkey" FOREIGN KEY ("barbeariaId") REFERENCES "barbearias"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "agendamentos" ADD CONSTRAINT "agendamentos_barbeiroId_fkey" FOREIGN KEY ("barbeiroId") REFERENCES "barbeiros"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "agendamentos" ADD CONSTRAINT "agendamentos_servicoId_fkey" FOREIGN KEY ("servicoId") REFERENCES "servicos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- O acesso passa pela API Nest, que valida sessão, perfil e propriedade.
-- As tabelas novas não devem expor dados via acesso direto anônimo ao Supabase.
ALTER TABLE "horarios_disponiveis" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "agendamentos" ENABLE ROW LEVEL SECURITY;
