import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateBarbeiroDto, UpdateBarbeiroDto } from './dto/barbeiro.dto.js';

@Injectable()
export class BarbeiroService {
  constructor(private readonly prisma: PrismaService) {}

  async findByBarbearia(barbeariaId: string) {
    return this.prisma.barbeiro.findMany({
      where: { barbeariaId },
      include: { servicos: { where: { ativo: true }, orderBy: { createdAt: 'asc' } } },
      orderBy: { createdAt: 'asc' },
    });
  }

  async create(barbeariaId: string, ownerId: string, dto: CreateBarbeiroDto) {
    await this.verificarDonoDaBarbearia(barbeariaId, ownerId);
    const barbeiro = await this.prisma.barbeiro.create({
      data: { barbeariaId, nome: dto.nome.trim(), foto: dto.foto },
    });
    return { message: 'Barbeiro adicionado com sucesso.', barbeiro };
  }

  async update(id: string, ownerId: string, dto: UpdateBarbeiroDto) {
    const barbeiro = await this.verificarDonoDoBarbeiro(id, ownerId);
    const atualizado = await this.prisma.barbeiro.update({
      where: { id: barbeiro.id },
      data: { ...dto, ...(dto.nome ? { nome: dto.nome.trim() } : {}) },
    });
    return { message: 'Barbeiro atualizado com sucesso.', barbeiro: atualizado };
  }

  async remove(id: string, ownerId: string) {
    const barbeiro = await this.verificarDonoDoBarbeiro(id, ownerId);
    await this.prisma.barbeiro.delete({ where: { id: barbeiro.id } });
    return { message: 'Barbeiro excluído com sucesso.' };
  }

  private async verificarDonoDaBarbearia(barbeariaId: string, ownerId: string) {
    const barbearia = await this.prisma.barbearia.findUnique({ where: { id: barbeariaId } });
    if (!barbearia) throw new NotFoundException('Barbearia não encontrada.');
    if (barbearia.ownerId !== ownerId) throw new ForbiddenException('Sem permissão para esta barbearia.');
    return barbearia;
  }

  private async verificarDonoDoBarbeiro(id: string, ownerId: string) {
    const barbeiro = await this.prisma.barbeiro.findUnique({
      where: { id },
      include: { barbearia: { select: { ownerId: true } } },
    });
    if (!barbeiro) throw new NotFoundException('Barbeiro não encontrado.');
    if (barbeiro.barbearia.ownerId !== ownerId) throw new ForbiddenException('Sem permissão para este barbeiro.');
    return barbeiro;
  }
}
