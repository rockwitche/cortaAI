import { Module } from '@nestjs/common';
import { ServicoController } from './servico.controller.js';
import { ServicoService } from './servico.service.js';

@Module({ controllers: [ServicoController], providers: [ServicoService] })
export class ServicoModule {}
