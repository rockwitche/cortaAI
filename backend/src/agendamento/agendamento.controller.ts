import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  UseGuards,
  Req,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { OptionalJwtAuthGuard } from '../auth/guards/optional-jwt-auth.guard.js';
import { BarberAuthGuard } from '../auth/guards/barber-auth.guard.js';
import {
  CreateAgendamentoDto,
  ConsultaAgendamentosDto,
} from './agendamento.dto';
import { AgendamentoService } from './agendamento.service';
import type { Request } from 'express';

@Controller('agendamentos')
export class AgendamentoController {
  constructor(
    private agendamentoService: AgendamentoService,
  ) {}

  // Criar agendamento (pode ser autenticado ou não)
  @Post()
  @UseGuards(OptionalJwtAuthGuard)
  async create(
    @Body()
    body: CreateAgendamentoDto,
    @Req() req: Request,
  ) {
    const userId = (req.user as { id: string } | undefined)?.id;
    return this.agendamentoService.create({ ...body, userId });
  }

  // Listar agendamentos do usuário logado
  @UseGuards(AuthGuard('jwt'))
  @Get('meus')
  async meus(@Req() req: Request) {
    const user = req.user as any;
    return this.agendamentoService.findByUser(user.id);
  }

  // Contagem de agendamentos do mês (para exibir uso do plano)
  @UseGuards(BarberAuthGuard)
  @Get('uso-mensal')
  async usoMensal(@Req() req: Request) {
    const user = req.user as any;
    return this.agendamentoService.contarAgendamentosMes(user.id);
  }

  // Agenda do barbeiro (dono) - lista agendamentos das suas barbearias
  @UseGuards(BarberAuthGuard)
  @Get('agenda')
  async agenda(@Req() req: Request, @Param() params: any) {
    const user = req.user as any;
    const data = (req.query as any).data as string | undefined;
    return this.agendamentoService.findByOwner(user.id, data);
  }

  // Consultar agendamentos por telefone (público, para clientes sem conta)
  @Post('consultar')
  async consultarPorTelefone(@Body() body: ConsultaAgendamentosDto) {
    return this.agendamentoService.findByTelefone(
      body.telefone,
      body.comprovantes,
    );
  }

  // Cancelar agendamento por telefone (público, para clientes sem conta)
  @Put(':id/cancelar-telefone')
  async cancelarPorTelefone(
    @Param('id') id: string,
    @Body('telefone') telefone: string,
    @Body('comprovante') comprovante: string,
  ) {
    return this.agendamentoService.cancelarPorTelefone(
      id,
      telefone,
      comprovante,
    );
  }

  // Horários ocupados de um barbeiro em uma data (público)
  @Get('ocupados/:barbeiroId')
  async horariosOcupados(
    @Param('barbeiroId') barbeiroId: string,
    @Req() req: Request,
    @Query('duracao', new ParseIntPipe({ optional: true })) duracao?: number,
  ) {
    const data = (req.query as any).data as string;
    if (!data) return [];
    return this.agendamentoService.horariosOcupados(barbeiroId, data, duracao);
  }

  // Listar agendamentos de uma barbearia
  @UseGuards(BarberAuthGuard)
  @Get('barbearia/:barbeariaId')
  async porBarbearia(
    @Param('barbeariaId') barbeariaId: string,
    @Req() req: Request,
  ) {
    return this.agendamentoService.findByBarbearia(
      barbeariaId,
      (req.user as any).id,
    );
  }

  // Atualizar status (barbeiro dono)
  @UseGuards(BarberAuthGuard)
  @Put(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body('status') status: 'CONFIRMADO' | 'CANCELADO' | 'CONCLUIDO',
    @Req() req: Request,
  ) {
    const user = req.user as any;
    return this.agendamentoService.updateStatus(id, user.id, status);
  }

  // Cancelar agendamento (cliente)
  @UseGuards(AuthGuard('jwt'))
  @Put(':id/cancelar')
  async cancelar(@Param('id') id: string, @Req() req: Request) {
    const user = req.user as any;
    return this.agendamentoService.cancelar(id, user.id);
  }

  // Buscar lembretes pendentes (barbeiro dono)
  @UseGuards(BarberAuthGuard)
  @Get('lembretes/pendentes')
  async lembretesPendentes(@Req() req: Request) {
    const user = req.user as any;
    return this.agendamentoService.findLembretesPendentes(user.id);
  }

  // Listar clientes do dono (agrupados por agendamentos)
  @UseGuards(BarberAuthGuard)
  @Get('clientes')
  async clientes(@Req() req: Request) {
    const user = req.user as any;
    return this.agendamentoService.findClientesByOwner(user.id);
  }

  // Marcar lembrete como enviado
  @UseGuards(BarberAuthGuard)
  @Put(':id/lembrete-enviado')
  async marcarLembreteEnviado(@Param('id') id: string, @Req() req: Request) {
    const user = req.user as any;
    return this.agendamentoService.marcarLembreteEnviado(id, user.id);
  }
}
