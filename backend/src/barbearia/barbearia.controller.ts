import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { Request } from 'express';
import { BarbeariaService } from './barbearia.service.js';
import { CreateBarbeariaDto, UpdateBarbeariaDto } from './dto/barbearia.dto.js';

@Controller('barbearias')
export class BarbeariaController {
  constructor(private readonly service: BarbeariaService) {}

  @Get()
  findAll(@Query('estado') estado?: string, @Query('cidade') cidade?: string, @Query('busca') busca?: string) {
    return this.service.findAll(estado, cidade, busca);
  }

  @Get('owner/me')
  @UseGuards(AuthGuard('jwt'))
  minhas(@Req() req: Request) {
    return this.service.findAllByOwner((req.user as { id: string }).id);
  }

  @Get(':slugOuId')
  findOne(@Param('slugOuId') slugOuId: string) {
    return this.service.findBySlugOuId(slugOuId);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Req() req: Request, @Body() dto: CreateBarbeariaDto) {
    return this.service.create((req.user as { id: string }).id, dto);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  update(@Req() req: Request, @Param('id') id: string, @Body() dto: UpdateBarbeariaDto) {
    return this.service.update(id, (req.user as { id: string }).id, dto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Req() req: Request, @Param('id') id: string) {
    return this.service.remove(id, (req.user as { id: string }).id);
  }
}
