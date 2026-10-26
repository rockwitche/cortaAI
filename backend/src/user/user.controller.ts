import {
  Controller,
  Get,
  Put,
  Delete,
  Body,
  UseGuards,
  Req,
  Post,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { UserService } from './user.service.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import type { Request } from 'express';

@Controller('user')
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(private userService: UserService) {}

  @Get('profile')
  async getProfile(@Req() req: Request) {
    const user = req.user as any;
    return this.userService.findById(user.id);
  }

  @Put('profile')
  async updateProfile(@Req() req: Request, @Body() dto: UpdateUserDto) {
    const user = req.user as any;
    return this.userService.update(user.id, dto);
  }

  @Post('avatar')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
      limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
      fileFilter: (_req, file, cb) => {
        if (!file.mimetype.startsWith('image/')) {
          return cb(new BadRequestException('Apenas imagens são permitidas.'), false);
        }
        cb(null, true);
      },
    }),
  )
  async uploadAvatar(
    @Req() req: Request,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('Nenhum arquivo enviado.');
    }
    const user = req.user as any;
    return this.userService.uploadAvatar(user.id, file);
  }

  @Delete('account')
  @HttpCode(HttpStatus.OK)
  async deleteAccount(@Req() req: Request) {
    const user = req.user as any;
    return this.userService.deleteAccount(user.id);
  }
}
