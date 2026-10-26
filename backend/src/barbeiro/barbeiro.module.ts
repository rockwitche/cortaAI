import { Module } from '@nestjs/common';
import { BarbeiroController } from './barbeiro.controller.js';
import { BarbeiroService } from './barbeiro.service.js';

@Module({ controllers: [BarbeiroController], providers: [BarbeiroService] })
export class BarbeiroModule {}
