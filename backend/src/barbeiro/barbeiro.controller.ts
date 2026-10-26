import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { Request } from 'express';
import { BarbeiroService } from './barbeiro.service.js';
import { CreateBarbeiroDto, UpdateBarbeiroDto } from './dto/barbeiro.dto.js';

@Controller('barbearias/:barbeariaId/barbeiros')
export class BarbeiroController {
  constructor(private readonly service: BarbeiroService) {}

  @Get()
  findAll(@Param('barbeariaId') barbeariaId: string) {
    return this.service.findByBarbearia(barbeariaId);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Param('barbeariaId') barbeariaId: string, @Req() req: Request, @Body() dto: CreateBarbeiroDto) {
    return this.service.create(barbeariaId, (req.user as { id: string }).id, dto);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  update(@Param('id') id: string, @Req() req: Request, @Body() dto: UpdateBarbeiroDto) {
    return this.service.update(id, (req.user as { id: string }).id, dto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string, @Req() req: Request) {
    return this.service.remove(id, (req.user as { id: string }).id);
  }
}
