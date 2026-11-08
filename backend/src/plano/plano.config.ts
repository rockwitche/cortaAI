export const PLANO_LIMITES = {
  BASICO: {
    maxAgendamentosMes: 30,
  },
  PROFISSIONAL: {
    maxAgendamentosMes: 200,
  },
  PREMIUM: {
    maxAgendamentosMes: -1,
  },
} as const;

export type PlanoType = keyof typeof PLANO_LIMITES;
