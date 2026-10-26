import { Controller, Get, Query } from '@nestjs/common';
import { BuscarMapaDto } from './dto/buscar-mapa.dto.js';
import { MapaService } from './mapa.service.js';

@Controller('mapa')
export class MapaController {
  constructor(private readonly mapaService: MapaService) {}

  @Get('buscar')
  buscar(@Query() dto: BuscarMapaDto) {
    return this.mapaService.buscar(dto);
  }
}
