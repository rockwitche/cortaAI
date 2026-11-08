import { createHash } from 'crypto';
import { AgendamentoService } from './agendamento.service';

function fixture() {
  const tx: any = {
    $executeRaw: jest.fn(async () => 1),
    barbearia: {
      findUnique: async () => ({
        ativa: true,
        ownerId: 'owner',
        owner: { plano: 'BASICO' },
      }),
      findMany: async () => [{ id: 'shop' }],
    },
    barbeiro: {
      findFirst: async () => ({
        id: 'barber',
        horarios: [
          {
            diaSemana: 5,
            horaInicio: '09:00',
            horaFim: '18:00',
            almocoInicio: '12:00',
            almocoFim: '13:00',
          },
        ],
      }),
    },
    servico: { findFirst: async () => ({ duracao: 30, barbeiroId: 'barber' }) },
    agendamento: {
      findMany: jest.fn(async () => []),
      count: jest.fn(async () => 0),
      create: jest.fn(async ({ data }) => ({ id: 'booking', ...data })),
    },
  };
  const prisma: any = { $transaction: jest.fn(async (fn) => fn(tx)) };
  return { service: new AgendamentoService(prisma), tx };
}
const input = {
  data: '2026-09-18',
  horario: '10:00',
  nomeCliente: 'Cliente',
  telefoneCliente: '(11) 99999-9999',
  barbeariaId: 'shop',
  barbeiroId: 'barber',
  servicoId: 'service',
};

describe('Booking security', () => {
  beforeEach(() =>
    jest.useFakeTimers({ now: new Date('2026-09-17T12:00:00Z') }),
  );
  afterEach(() => jest.useRealTimers());
  it('creates a valid booking with a private receipt and only persists its hash', async () => {
    const f = fixture();
    const result = await f.service.create(input);
    expect(result.guestAccessToken).toMatch(/^[a-f0-9]{64}$/);
    expect(result.agendamento).not.toHaveProperty('guestTokenHash');
    expect(f.tx.agendamento.create.mock.calls[0][0].data.guestTokenHash).toBe(
      createHash('sha256').update(result.guestAccessToken!).digest('hex'),
    );
    expect(f.tx.$executeRaw).toHaveBeenCalled();
    expect(result.agendamento.telefoneCliente).toBe('11999999999');
  });
  it.each(['12:00', '08:30', '17:45', '25:00'])(
    'rejects unavailable or invalid time %s',
    async (horario) => {
      const f = fixture();
      await expect(f.service.create({ ...input, horario })).rejects.toThrow();
      expect(f.tx.agendamento.create).not.toHaveBeenCalled();
    },
  );
  it('rejects overlapping durations and exhausted monthly quotas', async () => {
    const f = fixture();
    f.tx.agendamento.findMany.mockResolvedValue([
      { horario: '09:45', servico: { duracao: 30 } },
    ]);
    await expect(f.service.create(input)).rejects.toThrow();
    f.tx.agendamento.findMany.mockResolvedValue([]);
    f.tx.agendamento.count.mockResolvedValue(30);
    await expect(f.service.create(input)).rejects.toThrow();
    expect(f.tx.agendamento.create).not.toHaveBeenCalled();
  });
});
