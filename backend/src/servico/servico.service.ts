import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateServicoDto, UpdateServicoDto } from './dto/servico.dto.js';

@Injectable()
export class ServicoService {
  constructor(private readonly prisma: PrismaService) {}

  async findByBarbearia(barbeariaId: string) {
    return this.prisma.servico.findMany({ where: { barbeariaId }, orderBy: { createdAt: 'asc' } });
  }

  async create(barbeariaId: string, ownerId: string, dto: CreateServicoDto) {
    await this.verificarDonoDaBarbearia(barbeariaId, ownerId);
    await this.validarBarbeiro(dto.barbeiroId, barbeariaId);
    const servico = await this.prisma.servico.create({
      data: { ...dto, nome: dto.nome.trim(), barbeariaId },
    });
    return { message: 'Serviço adicionado com sucesso.', servico };
  }

  async update(id: string, ownerId: string, dto: UpdateServicoDto) {
    const servico = await this.prisma.servico.findUnique({
      where: { id },
      include: { barbearia: { select: { ownerId: true } } },
    });
    if (!servico) throw new NotFoundException('Serviço não encontrado.');
    if (servico.barbearia.ownerId !== ownerId) throw new ForbiddenException('Sem permissão para este serviço.');
    await this.validarBarbeiro(dto.barbeiroId, servico.barbeariaId);
    const atualizado = await this.prisma.servico.update({
      where: { id },
      data: { ...dto, ...(dto.nome ? { nome: dto.nome.trim() } : {}) },
    });
    return { message: 'Serviço atualizado com sucesso.', servico: atualizado };
  }

  async remove(id: string, ownerId: string) {
    const servico = await this.prisma.servico.findUnique({
      where: { id },
      include: { barbearia: { select: { ownerId: true } } },
    });
    if (!servico) throw new NotFoundException('Serviço não encontrado.');
    if (servico.barbearia.ownerId !== ownerId) throw new ForbiddenException('Sem permissão para este serviço.');
    await this.prisma.servico.delete({ where: { id } });
    return { message: 'Serviço excluído com sucesso.' };
  }

  private async verificarDonoDaBarbearia(barbeariaId: string, ownerId: string) {
    const barbearia = await this.prisma.barbearia.findUnique({ where: { id: barbeariaId } });
    if (!barbearia) throw new NotFoundException('Barbearia não encontrada.');
    if (barbearia.ownerId !== ownerId) throw new ForbiddenException('Sem permissão para esta barbearia.');
  }

  private async validarBarbeiro(barbeiroId: string | undefined, barbeariaId: string) {
    if (!barbeiroId) return;
    const barbeiro = await this.prisma.barbeiro.findFirst({ where: { id: barbeiroId, barbeariaId } });
    if (!barbeiro) throw new BadRequestException('O barbeiro não pertence a esta barbearia.');
  }
}
