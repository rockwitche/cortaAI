import { Module } from '@nestjs/common';
import { HorarioController } from './horario.controller.js';
import { HorarioService } from './horario.service.js';

@Module({
  controllers: [HorarioController],
  providers: [HorarioService],
  exports: [HorarioService],
})
export class HorarioModule {}
