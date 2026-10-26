import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService, User } from '../../../auth/auth.service';

interface Plano {
  id: 'BASICO' | 'PROFISSIONAL' | 'PREMIUM';
  nome: string;
  preco: string;
  descricao: string;
  icone: string;
  destaque?: boolean;
  recursos: string[];
}

@Component({
  selector: 'app-planos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './planos.html',
  styleUrl: './planos.scss',
})
export class PlanosComponent implements OnInit, OnDestroy {
  usuario: User | null = null;
  aviso = '';
  private avisoTimer?: ReturnType<typeof setTimeout>;

  readonly planos: Plano[] = [
    {
      id: 'BASICO', nome: 'Básico', preco: 'Grátis', descricao: 'Para começar a organizar a sua barbearia.', icone: 'fa-solid fa-scissors',
      recursos: ['1 barbearia', '2 barbeiros por barbearia', '3 serviços por barbeiro', 'Agenda do dia', 'Página pública da barbearia'],
    },
    {
      id: 'PROFISSIONAL', nome: 'Profissional', preco: 'R$ 29,90/mês', descricao: 'Para uma operação em crescimento.', icone: 'fa-solid fa-star', destaque: true,
      recursos: ['3 barbearias', '5 barbeiros por barbearia', '10 serviços por barbeiro', 'Agendamentos ilimitados', 'Gestão de clientes e lembretes'],
    },
    {
      id: 'PREMIUM', nome: 'Premium', preco: 'R$ 59,90/mês', descricao: 'Todos os recursos para o seu negócio.', icone: 'fa-solid fa-crown',
      recursos: ['Barbearias ilimitadas', 'Barbeiros e serviços ilimitados', 'Agendamentos ilimitados', 'Fotos de barbeiros', 'Relatórios e suporte prioritário'],
    },
  ];

  constructor(private readonly auth: AuthService, private readonly router: Router) {}

  ngOnInit() {
    this.auth.user$.subscribe((usuario) => (this.usuario = usuario));
  }

  ngOnDestroy() {
    if (this.avisoTimer) clearTimeout(this.avisoTimer);
  }

  get planoAtual() {
    return this.usuario?.plano ?? 'BASICO';
  }

  selecionar(plano: Plano) {
    if (plano.id === this.planoAtual) return;
    if (plano.id === 'BASICO') {
      this.mostrarAviso('O plano Básico já está disponível para a sua conta.');
      return;
    }

    // O checkout é um card posterior; este botão deixa o fluxo preparado sem simular cobrança.
    this.mostrarAviso(`O upgrade para o plano ${plano.nome} estará disponível em breve.`);
  }

  voltarParaBarbearias() {
    void this.router.navigate(['/dashboard/barbearias']);
  }

  private mostrarAviso(mensagem: string) {
    this.aviso = mensagem;
    if (this.avisoTimer) clearTimeout(this.avisoTimer);
    this.avisoTimer = setTimeout(() => (this.aviso = ''), 4_000);
  }
}
