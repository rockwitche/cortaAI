import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateBarbeariaDto, UpdateBarbeariaDto } from './dto/barbearia.dto.js';

@Injectable()
export class BarbeariaService {
  constructor(private readonly prisma: PrismaService) {}

  private normalizarSlug(nome: string): string {
    return nome
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }

  private async gerarSlugUnico(nome: string, ignorarId?: string): Promise<string> {
    const base = this.normalizarSlug(nome) || 'barbearia';
    let candidato = base;
    let sufixo = 2;

    while (true) {
      const existente = await this.prisma.barbearia.findUnique({ where: { slug: candidato } });
      if (!existente || existente.id === ignorarId) return candidato;
      candidato = `${base}-${sufixo++}`;
    }
  }

  private dadosNormalizados<T extends CreateBarbeariaDto | UpdateBarbeariaDto>(dto: T): T {
    return {
      ...dto,
      nome: dto.nome?.trim(),
      endereco: dto.endereco?.trim(),
      cidade: dto.cidade?.trim(),
      estado: dto.estado?.trim().toUpperCase(),
      descricao: dto.descricao?.trim(),
      pontoReferencia: dto.pontoReferencia?.trim(),
      telefone: dto.telefone?.trim(),
      whatsapp: dto.whatsapp?.trim(),
    };
  }

  async create(ownerId: string, dto: CreateBarbeariaDto) {
    const dados = this.dadosNormalizados(dto);
    const slug = await this.gerarSlugUnico(dados.nome);
    const barbearia = await this.prisma.barbearia.create({
      data: { ...dados, slug, ownerId },
    });
    return { message: 'Barbearia criada com sucesso.', barbearia };
  }

  async findAll(estado?: string, cidade?: string, busca?: string) {
    const termo = busca?.trim();
    return this.prisma.barbearia.findMany({
      where: {
        ativa: true,
        ...(estado?.trim() ? { estado: { equals: estado.trim(), mode: 'insensitive' } } : {}),
        ...(cidade?.trim() ? { cidade: { equals: cidade.trim(), mode: 'insensitive' } } : {}),
        ...(termo ? { nome: { contains: termo, mode: 'insensitive' } } : {}),
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findAllByOwner(ownerId: string) {
    return this.prisma.barbearia.findMany({ where: { ownerId }, orderBy: { createdAt: 'desc' } });
  }

  async findBySlugOuId(slugOuId: string) {
    const incluir = {
      barbeiros: { include: { servicos: { where: { ativo: true } } }, orderBy: { createdAt: 'asc' as const } },
      servicos: { where: { ativo: true }, orderBy: { createdAt: 'asc' as const } },
    };
    const porSlug = await this.prisma.barbearia.findUnique({ where: { slug: slugOuId }, include: incluir });
    const barbearia = porSlug ?? await this.prisma.barbearia.findUnique({ where: { id: slugOuId }, include: incluir });
    if (!barbearia) throw new NotFoundException('Barbearia não encontrada.');
    return barbearia;
  }

  async update(id: string, ownerId: string, dto: UpdateBarbeariaDto) {
    await this.verificarPropriedade(id, ownerId);
    const dados = this.dadosNormalizados(dto);
    const barbearia = await this.prisma.barbearia.update({
      where: { id },
      data: { ...dados, ...(dados.nome ? { slug: await this.gerarSlugUnico(dados.nome, id) } : {}) },
    });
    return { message: 'Barbearia atualizada com sucesso.', barbearia };
  }

  async remove(id: string, ownerId: string) {
    await this.verificarPropriedade(id, ownerId);
    await this.prisma.barbearia.delete({ where: { id } });
    return { message: 'Barbearia excluída com sucesso.' };
  }

  async verificarPropriedade(id: string, ownerId: string) {
    const barbearia = await this.prisma.barbearia.findUnique({ where: { id } });
    if (!barbearia) throw new NotFoundException('Barbearia não encontrada.');
    if (barbearia.ownerId !== ownerId) throw new ForbiddenException('Sem permissão para esta barbearia.');
    return barbearia;
  }
}
