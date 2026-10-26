import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { AuthModule } from './auth/auth.module.js';
import { UserModule } from './user/user.module.js';
import { BarbeariaModule } from './barbearia/barbearia.module.js';
import { BarbeiroModule } from './barbeiro/barbeiro.module.js';
import { ServicoModule } from './servico/servico.module.js';
import { MapaModule } from './mapa/mapa.module.js';

@Module({
  imports: [
    // Carrega variáveis de ambiente globalmente
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    // Módulo Prisma global (já @Global, mas registramos aqui por clareza)
    PrismaModule,
    // Módulo de autenticação (registro, login, verificação de e-mail, OAuth)
    AuthModule,
    // Módulo de usuário (perfil, avatar, exclusão de conta)
    UserModule,
    BarbeariaModule,
    BarbeiroModule,
    ServicoModule,
    MapaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
