import { Module } from '@nestjs/common';
import { MapaController } from './mapa.controller.js';
import { MapaService } from './mapa.service.js';

@Module({ controllers: [MapaController], providers: [MapaService] })
export class MapaModule {}
