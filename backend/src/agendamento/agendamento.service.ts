import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { createHash, randomBytes } from 'crypto';
import { PrismaService } from '../prisma/prisma.service';
import { PLANO_LIMITES, PlanoType } from '../plano/plano.config';

@Injectable()
export class AgendamentoService {
  constructor(private prisma: PrismaService) {}

  private normalizeTelefone(telefone: string): string {
    if (typeof telefone !== 'string')
      throw new BadRequestException('Telefone inválido.');
    return telefone.replace(/\D/g, '');
  }

  async contarAgendamentosMes(ownerId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: ownerId } });
    const plano = (user?.plano as PlanoType) || 'BASICO';
    const limites = PLANO_LIMITES[plano];

    const barbearias = await this.prisma.barbearia.findMany({
      where: { ownerId },
      select: { id: true },
    });

    const mesAtual = new Date().toISOString().substring(0, 7);
    const count = await this.prisma.agendamento.count({
      where: {
        barbeariaId: { in: barbearias.map((b) => b.id) },
        data: { startsWith: mesAtual },
        status: { not: 'CANCELADO' },
      },
    });

    return {
      usado: count,
      limite: limites.maxAgendamentosMes,
      plano,
    };
  }

  async create(data: {
    data: string;
    horario: string;
    nomeCliente: string;
    telefoneCliente: string;
    barbeariaId: string;
    barbeiroId: string;
    servicoId: string;
    userId?: string;
  }) {
    return this.prisma.$transaction(async (tx) => {
      // Validar telefone (10-11 dígitos: DDD + número)
      const telDigits = this.normalizeTelefone(data.telefoneCliente);
      if (telDigits.length < 10 || telDigits.length > 11) {
        throw new BadRequestException(
          'Telefone inválido. Informe DDD + número (10 ou 11 dígitos).',
        );
      }

      // Verificar limite de agendamentos do plano do dono da barbearia
      const barbearia = await tx.barbearia.findUnique({
        where: { id: data.barbeariaId },
        include: { owner: { select: { id: true, plano: true } } },
      });
      if (!barbearia?.ativa)
        throw new BadRequestException('Barbearia indisponível.');
      // Serializes bookings across processes before checking availability/plan quota.
      await tx.$executeRaw`SELECT pg_advisory_xact_lock(hashtext(${barbearia.ownerId}))`;
      const barber = await tx.barbeiro.findFirst({
        where: {
          id: data.barbeiroId,
          barbeariaId: data.barbeariaId,
          ativo: true,
        },
        include: { horarios: true },
      });
      const service = await tx.servico.findFirst({
        where: {
          id: data.servicoId,
          barbeariaId: data.barbeariaId,
          ativo: true,
        },
      });
      if (
        !barber ||
        !service ||
        (service.barbeiroId && service.barbeiroId !== barber.id)
      )
        throw new BadRequestException(
          'Barbeiro ou serviço inválido para esta barbearia.',
        );
      const date = new Date(data.data + 'T12:00:00Z');
      const today = new Date().toLocaleDateString('en-CA', {
        timeZone: 'America/Fortaleza',
      });
      if (
        !/^\d{4}-\d{2}-\d{2}$/.test(data.data) ||
        Number.isNaN(date.getTime()) ||
        date.toISOString().slice(0, 10) !== data.data ||
        data.data < today
      )
        throw new BadRequestException('Data inválida.');
      if (!/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(data.horario))
        throw new BadRequestException('Horário inválido.');
      const minutes = (value: string) =>
        Number(value.slice(0, 2)) * 60 + Number(value.slice(3));
      const begin = minutes(data.horario),
        finish = begin + service.duracao;
      const available = barber.horarios.some(
        (h) =>
          h.diaSemana === date.getUTCDay() &&
          begin >= minutes(h.horaInicio) &&
          finish <= minutes(h.horaFim) &&
          !(
            h.almocoInicio &&
            h.almocoFim &&
            begin < minutes(h.almocoFim) &&
            finish > minutes(h.almocoInicio)
          ),
      );
      if (!available)
        throw new BadRequestException('Horário fora da disponibilidade.');
      const occupied = await tx.agendamento.findMany({
        where: {
          barbeiroId: barber.id,
          data: data.data,
          status: { not: 'CANCELADO' },
        },
        include: { servico: true },
      });
      if (
        occupied.some(
          (a) =>
            begin < minutes(a.horario) + a.servico.duracao &&
            finish > minutes(a.horario),
        )
      )
        throw new BadRequestException('Este horário já está ocupado.');
      if (barbearia) {
        const limites =
          PLANO_LIMITES[(barbearia.owner.plano as PlanoType) || 'BASICO'];
        if (limites.maxAgendamentosMes !== -1) {
          // Contar agendamentos do mês atual para as barbearias desse dono
          const barbearias = await tx.barbearia.findMany({
            where: { ownerId: barbearia.ownerId },
            select: { id: true },
          });
          const mesAtual = data.data.substring(0, 7); // "2026-03"
          const count = await tx.agendamento.count({
            where: {
              barbeariaId: { in: barbearias.map((b) => b.id) },
              data: { startsWith: mesAtual },
              status: { not: 'CANCELADO' },
            },
          });
          if (count >= limites.maxAgendamentosMes) {
            throw new BadRequestException(
              `A barbearia atingiu o limite de ${limites.maxAgendamentosMes} agendamentos/mês do plano ${barbearia.owner.plano}. O dono precisa fazer upgrade.`,
            );
          }
        }
      }

      const guestAccessToken = data.userId
        ? null
        : randomBytes(32).toString('hex');
      const agendamento = await tx.agendamento.create({
        data: {
          guestTokenHash: guestAccessToken
            ? createHash('sha256').update(guestAccessToken).digest('hex')
            : null,
          data: data.data,
          horario: data.horario,
          nomeCliente: data.nomeCliente,
          // Salvar sempre normalizado para manter consistência na consulta.
          telefoneCliente: telDigits,
          barbeariaId: data.barbeariaId,
          barbeiroId: data.barbeiroId,
          servicoId: data.servicoId,
          userId: data.userId || null,
        },
        include: {
          barbearia: {
            select: { id: true, nome: true, endereco: true, telefone: true },
          },
          barbeiro: { select: { id: true, nome: true, foto: true } },
          servico: {
            select: { id: true, nome: true, preco: true, duracao: true },
          },
        },
      });

      const { guestTokenHash, ...publicBooking } = agendamento;
      return {
        message: 'Agendamento realizado com sucesso!',
        agendamento: publicBooking,
        guestAccessToken,
      };
    });
  }

  async findByUser(userId: string) {
    const where = { userId };

    return this.prisma.agendamento.findMany({
      where,
      include: {
        barbearia: {
          select: {
            id: true,
            nome: true,
            endereco: true,
            telefone: true,
            slug: true,
          },
        },
        barbeiro: { select: { id: true, nome: true, foto: true } },
        servico: {
          select: { id: true, nome: true, preco: true, duracao: true },
        },
      },
      orderBy: [{ data: 'desc' }, { horario: 'desc' }],
    });
  }

  async findByBarbearia(barbeariaId: string, ownerId: string) {
    const shop = await this.prisma.barbearia.findFirst({
      where: { id: barbeariaId, ownerId },
    });
    if (!shop) throw new ForbiddenException('Sem permissão.');
    return this.prisma.agendamento.findMany({
      where: { barbeariaId },
      include: {
        barbeiro: { select: { id: true, nome: true, foto: true } },
        servico: {
          select: { id: true, nome: true, preco: true, duracao: true },
        },
      },
      orderBy: [{ data: 'asc' }, { horario: 'asc' }],
    });
  }

  // Buscar agendamentos para a agenda do barbeiro (dono)
  async findByOwner(ownerId: string, data?: string) {
    // Buscar todas as barbearias do dono
    const barbearias = await this.prisma.barbearia.findMany({
      where: { ownerId },
      select: { id: true },
    });
    const barbeariaIds = barbearias.map((b) => b.id);
    if (barbeariaIds.length === 0) return [];

    const where: any = { barbeariaId: { in: barbeariaIds } };
    if (data) where.data = data;

    return this.prisma.agendamento.findMany({
      where,
      include: {
        user: {
          select: { id: true, nome: true, avatar: true, telefone: true },
        },
        barbearia: { select: { id: true, nome: true } },
        barbeiro: { select: { id: true, nome: true, foto: true } },
        servico: {
          select: { id: true, nome: true, preco: true, duracao: true },
        },
      },
      orderBy: [{ data: 'asc' }, { horario: 'asc' }],
    });
  }

  // Atualizar status (barbeiro dono)
  async updateStatus(
    id: string,
    ownerId: string,
    status: 'CONFIRMADO' | 'CANCELADO' | 'CONCLUIDO',
  ) {
    if (!['CONFIRMADO', 'CANCELADO', 'CONCLUIDO'].includes(status))
      throw new BadRequestException('Status inválido.');
    const agendamento = await this.prisma.agendamento.findUnique({
      where: { id },
      include: { barbearia: { select: { ownerId: true } } },
    });
    if (!agendamento)
      throw new NotFoundException('Agendamento não encontrado.');
    if (agendamento.barbearia.ownerId !== ownerId)
      throw new ForbiddenException('Sem permissão.');

    const updated = await this.prisma.agendamento.update({
      where: { id },
      data: { status },
    });
    return { message: 'Status atualizado.', agendamento: updated };
  }

  async cancelar(id: string, userId: string) {
    const agendamento = await this.prisma.agendamento.findUnique({
      where: { id },
    });
    if (!agendamento)
      throw new NotFoundException('Agendamento não encontrado.');
    if (agendamento.userId !== userId)
      throw new ForbiddenException('Sem permissão.');

    const updated = await this.prisma.agendamento.update({
      where: { id },
      data: { status: 'CANCELADO' },
    });

    return { message: 'Agendamento cancelado.', agendamento: updated };
  }

  // Buscar agendamentos por telefone (para clientes sem conta)
  async findByTelefone(telefone: string, comprovantes: string[] = []) {
    const tel = this.normalizeTelefone(telefone);
    if (tel.length < 10 || tel.length > 11 || !comprovantes.length) return [];
    const hashes = comprovantes
      .filter((t) => /^[a-f0-9]{64}$/.test(t))
      .slice(0, 100)
      .map((t) => createHash('sha256').update(t).digest('hex'));
    const items = await this.prisma.agendamento.findMany({
      where: {
        userId: null,
        telefoneCliente: tel,
        guestTokenHash: { in: hashes },
      },
      include: {
        barbearia: {
          select: {
            id: true,
            nome: true,
            endereco: true,
            telefone: true,
            slug: true,
          },
        },
        barbeiro: { select: { id: true, nome: true, foto: true } },
        servico: {
          select: { id: true, nome: true, preco: true, duracao: true },
        },
      },
      orderBy: [{ data: 'desc' }, { horario: 'desc' }],
    });
    return items.map(({ guestTokenHash, ...item }) => item);
  }

  async cancelarPorTelefone(
    id: string,
    telefone: string,
    comprovante?: string,
  ) {
    const tel = this.normalizeTelefone(telefone);
    if (!/^[a-f0-9]{64}$/.test(comprovante || '') || !/^\d{10,11}$/.test(tel))
      throw new ForbiddenException(
        'Use o comprovante deste agendamento para cancelar.',
      );
    const result = await this.prisma.agendamento.updateMany({
      where: {
        id,
        userId: null,
        telefoneCliente: tel,
        guestTokenHash: createHash('sha256').update(comprovante!).digest('hex'),
        status: { in: ['PENDENTE', 'CONFIRMADO'] },
      },
      data: { status: 'CANCELADO' },
    });
    if (!result.count)
      throw new ForbiddenException(
        'Agendamento indisponível ou comprovante inválido.',
      );
    return { message: 'Agendamento cancelado.' };
  }

  // Buscar clientes únicos das barbearias do dono
  async findClientesByOwner(ownerId: string) {
    const barbearias = await this.prisma.barbearia.findMany({
      where: { ownerId },
      select: { id: true },
    });
    const barbeariaIds = barbearias.map((b) => b.id);
    if (barbeariaIds.length === 0) return [];

    const agendamentos = await this.prisma.agendamento.findMany({
      where: { barbeariaId: { in: barbeariaIds } },
      include: {
        user: {
          select: {
            id: true,
            nome: true,
            avatar: true,
            email: true,
            telefone: true,
          },
        },
        barbearia: { select: { id: true, nome: true } },
        barbeiro: { select: { id: true, nome: true } },
        servico: {
          select: { id: true, nome: true, preco: true, duracao: true },
        },
      },
      orderBy: [{ data: 'desc' }, { horario: 'desc' }],
    });

    // Agrupar por cliente (userId ou telefoneCliente como chave)
    const clientesMap = new Map<string, any>();

    for (const ag of agendamentos) {
      const key = ag.userId || `tel:${ag.telefoneCliente}`;

      if (!clientesMap.has(key)) {
        clientesMap.set(key, {
          id: key,
          nome: ag.user?.nome || ag.nomeCliente,
          telefone: ag.user?.telefone || ag.telefoneCliente,
          email: ag.user?.email || null,
          avatar: ag.user?.avatar || null,
          cadastrado: !!ag.userId,
          totalAgendamentos: 0,
          totalConcluidos: 0,
          totalCancelados: 0,
          totalGasto: 0,
          ultimoAgendamento: null as any,
          primeiroAgendamento: null as any,
          servicos: new Set<string>(),
          agendamentos: [] as any[],
        });
      }

      const cliente = clientesMap.get(key)!;
      cliente.totalAgendamentos++;
      if (ag.status === 'CONCLUIDO') {
        cliente.totalConcluidos++;
        cliente.totalGasto += ag.servico.preco;
      }
      if (ag.status === 'CANCELADO') cliente.totalCancelados++;
      cliente.servicos.add(ag.servico.nome);

      // Último e primeiro agendamento (já ordenados desc)
      if (!cliente.ultimoAgendamento) {
        cliente.ultimoAgendamento = {
          data: ag.data,
          horario: ag.horario,
          status: ag.status,
        };
      }
      cliente.primeiroAgendamento = { data: ag.data, horario: ag.horario };

      cliente.agendamentos.push({
        id: ag.id,
        data: ag.data,
        horario: ag.horario,
        status: ag.status,
        servico: ag.servico,
        barbeiro: ag.barbeiro,
        barbearia: ag.barbearia,
      });
    }

    // Converter Sets e retornar array
    return Array.from(clientesMap.values()).map((c) => ({
      ...c,
      servicos: Array.from(c.servicos),
    }));
  }

  // Buscar horários ocupados de um barbeiro em uma data
  async horariosOcupados(barbeiroId: string, data: string): Promise<string[]> {
    const agendamentos = await this.prisma.agendamento.findMany({
      where: {
        barbeiroId,
        data,
        status: { notIn: ['CANCELADO'] },
      },
      select: { horario: true },
    });
    return agendamentos.map((a) => a.horario);
  }

  // Buscar agendamentos que precisam de lembrete (30 min antes)
  async findLembretesPendentes(ownerId: string): Promise<any[]> {
    // Buscar barbearias do dono que têm lembrete ativo
    const barbearias = await this.prisma.barbearia.findMany({
      where: { ownerId, lembreteAtivo: true, mensagemLembrete: { not: null } },
      select: { id: true, nome: true, mensagemLembrete: true },
    });
    if (barbearias.length === 0) return [];

    const barbeariaIds = barbearias.map((b) => b.id);
    const barbeariaMap = new Map<string, { mensagemLembrete: string | null }>(
      barbearias.map((b) => [b.id, b]),
    );

    // Data e hora atual
    const agora = new Date();
    const hoje = agora.toISOString().split('T')[0];
    const agoraMinutos = agora.getHours() * 60 + agora.getMinutes();
    const limiteMinutos = agoraMinutos + 30;

    // Buscar agendamentos de hoje que não foram cancelados e não tiveram lembrete enviado
    const agendamentos = await this.prisma.agendamento.findMany({
      where: {
        barbeariaId: { in: barbeariaIds },
        data: hoje,
        status: { notIn: ['CANCELADO', 'CONCLUIDO'] },
        lembreteEnviado: false,
      },
      include: {
        barbearia: { select: { id: true, nome: true, mensagemLembrete: true } },
        barbeiro: { select: { id: true, nome: true } },
        servico: {
          select: { id: true, nome: true, preco: true, duracao: true },
        },
      },
      orderBy: { horario: 'asc' },
    });

    // Filtrar os que são nos próximos 30 minutos
    return agendamentos
      .filter((ag) => {
        const [h, m] = ag.horario.split(':').map(Number);
        const agMinutos = h * 60 + m;
        return agMinutos > agoraMinutos && agMinutos <= limiteMinutos;
      })
      .map((ag) => {
        const barbearia = barbeariaMap.get(ag.barbeariaId);
        let mensagem = barbearia?.mensagemLembrete || '';
        // Substituir variáveis na mensagem
        mensagem = mensagem
          .replace(/{nome}/g, ag.nomeCliente)
          .replace(/{servico}/g, ag.servico.nome)
          .replace(/{horario}/g, ag.horario)
          .replace(/{data}/g, ag.data.split('-').reverse().join('/'))
          .replace(/{barbearia}/g, ag.barbearia.nome)
          .replace(/{barbeiro}/g, ag.barbeiro.nome);

        return {
          ...ag,
          mensagemFormatada: mensagem,
        };
      });
  }

  // Marcar lembrete como enviado
  async marcarLembreteEnviado(id: string, ownerId: string) {
    const agendamento = await this.prisma.agendamento.findUnique({
      where: { id },
      include: { barbearia: { select: { ownerId: true } } },
    });
    if (!agendamento)
      throw new NotFoundException('Agendamento não encontrado.');
    if (agendamento.barbearia.ownerId !== ownerId)
      throw new ForbiddenException('Sem permissão.');

    return this.prisma.agendamento.update({
      where: { id },
      data: { lembreteEnviado: true },
    });
  }
}
