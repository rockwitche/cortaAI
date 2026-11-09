import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { timeout } from 'rxjs';
import { getAuthRequestErrorMessage } from '../../auth/auth-request-error';

interface Agendamento {
  id: string;
  data: string;
  horario: string;
  status: string;
  barbearia: { nome: string; endereco: string };
  barbeiro: { nome: string };
  servico: { nome: string; preco: number; duracao: number };
}

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './meus-agendamentos.html',
  styleUrl: './meus-agendamentos.scss',
})
export class MeusAgendamentosComponent implements OnInit {
  private readonly http = inject(HttpClient);
  private readonly destroyRef = inject(DestroyRef);
  agendamentos: Agendamento[] = [];
  carregando = false;
  erro = '';
  ngOnInit() { this.carregar(); }
  carregar() {
    if (this.carregando) return;
    this.carregando = true;
    this.erro = '';
    this.http.get<Agendamento[]>('/api/agendamentos/meus')
      .pipe(timeout(30_000), takeUntilDestroyed(this.destroyRef)).subscribe({
        next: dados => { this.agendamentos = dados; this.carregando = false; },
        error: err => {
          this.carregando = false;
          this.erro = err.status === 401 ? 'Sua sessão expirou. Entre novamente para consultar seus agendamentos.'
            : getAuthRequestErrorMessage(err, 'Não foi possível consultar seus agendamentos.', 'A consulta demorou demais. Tente novamente.');
        },
      });
  }
  formatarData(data: string) { return data.slice(0, 10).split('-').reverse().join('/'); }
  statusLabel(status: string) {
    return ({ PENDENTE: 'Pendente', CONFIRMADO: 'Confirmado', CANCELADO: 'Cancelado', CONCLUIDO: 'Concluído' } as Record<string, string>)[status] || status;
  }
}
