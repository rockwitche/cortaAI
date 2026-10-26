import { Module } from '@nestjs/common';
import { BarbeariaController } from './barbearia.controller.js';
import { BarbeariaService } from './barbearia.service.js';

@Module({ controllers: [BarbeariaController], providers: [BarbeariaService], exports: [BarbeariaService] })
export class BarbeariaModule {}
