import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { UpdateUserDto } from './dto/update-user.dto.js';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        nome: true,
        email: true,
        telefone: true,
        tipo: true,
        plano: true,
        avatar: true,
        emailVerified: true,
        createdAt: true,
      },
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return user;
  }

  async update(id: string, dto: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const { nome, telefone, tipo } = dto;

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: { nome, telefone, tipo },
      select: {
        id: true,
        nome: true,
        email: true,
        telefone: true,
        tipo: true,
        plano: true,
        avatar: true,
      },
    });

    return {
      message: 'Perfil atualizado com sucesso',
      user: updatedUser,
    };
  }

  async uploadAvatar(id: string, file: Express.Multer.File) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    if (!file || !file.mimetype.startsWith('image/')) {
      throw new BadRequestException('Arquivo inválido. Envie uma imagem.');
    }

    if (file.size > 5 * 1024 * 1024) {
      throw new BadRequestException('Imagem muito grande. Máximo 5 MB.');
    }

    // Aqui você pode integrar com um storage (S3, Cloudinary, etc.)
    // Por enquanto, salva o buffer como base64 (apenas para desenvolvimento)
    const base64 = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: { avatar: base64 },
      select: { id: true, avatar: true },
    });

    return {
      message: 'Avatar atualizado com sucesso',
      avatar: updatedUser.avatar,
    };
  }

  async deleteAccount(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    await this.prisma.user.delete({ where: { id } });

    return { message: 'Conta excluída com sucesso.' };
  }
}
