import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

interface HorarioData {
  diaSemana: number;
  horaInicio: string;
  horaFim: string;
  almocoInicio?: string;
  almocoFim?: string;
}

@Injectable()
export class HorarioService {
  constructor(private prisma: PrismaService) {}

  private async verificarDonoBarbeiro(barbeiroId: string, ownerId: string) {
    const barbeiro = await this.prisma.barbeiro.findUnique({
      where: { id: barbeiroId },
      include: { barbearia: true },
    });
    if (!barbeiro) throw new NotFoundException('Barbeiro não encontrado.');
    if (barbeiro.barbearia.ownerId !== ownerId)
      throw new ForbiddenException('Sem permissão.');
    return barbeiro;
  }

  async setHorarios(
    barbeiroId: string,
    ownerId: string,
    horarios: HorarioData[],
  ) {
    await this.verificarDonoBarbeiro(barbeiroId, ownerId);
    const time = (v: unknown): v is string =>
      typeof v === 'string' && /^(?:[01]\d|2[0-3]):[0-5]\d$/.test(v);
    if (
      !Array.isArray(horarios) ||
      horarios.length > 7 ||
      new Set(horarios.map((h) => h?.diaSemana)).size !== horarios.length ||
      horarios.some(
        (h) =>
          !h ||
          !Number.isInteger(h.diaSemana) ||
          h.diaSemana < 0 ||
          h.diaSemana > 6 ||
          !time(h.horaInicio) ||
          !time(h.horaFim) ||
          h.horaInicio >= h.horaFim ||
          ((h.almocoInicio || h.almocoFim) &&
            (!time(h.almocoInicio) ||
              !time(h.almocoFim) ||
              h.almocoInicio >= h.almocoFim ||
              h.almocoInicio < h.horaInicio ||
              h.almocoFim > h.horaFim)),
      )
    ) {
      throw new BadRequestException(
        'Horários inválidos. Informe até um período válido por dia.',
      );
    }

    // Remove horários antigos e cria novos
    await this.prisma.$transaction(async (tx) => {
      await tx.horarioDisponivel.deleteMany({
        where: { barbeiroId },
      });

      await tx.horarioDisponivel.createMany({
        data: horarios.map((h) => ({
          barbeiroId,
          diaSemana: h.diaSemana,
          horaInicio: h.horaInicio,
          horaFim: h.horaFim,
          almocoInicio: h.almocoInicio || null,
          almocoFim: h.almocoFim || null,
        })),
      });
    });
    const result = await this.prisma.horarioDisponivel.findMany({
      where: { barbeiroId },
      orderBy: { diaSemana: 'asc' },
    });

    return { message: 'Horários atualizados!', horarios: result };
  }

  async findByBarbeiro(barbeiroId: string) {
    return this.prisma.horarioDisponivel.findMany({
      where: { barbeiroId },
      orderBy: { diaSemana: 'asc' },
    });
  }
}
