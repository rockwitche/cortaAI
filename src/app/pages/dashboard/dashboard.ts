import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService, User } from '../../auth/auth.service';

interface BarbeariaResumo {
  id: string;
  nome: string;
  cidade: string;
  estado: string;
  ativa: boolean;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class DashboardComponent implements OnInit {

  menuLateralRecolhido = false;
  rotaAtiva = '';
  ehVisaoMobile = false;
  menuMobileAberto = false;
  usuario: User | null = null;
  barbearias: BarbeariaResumo[] = [];
  carregandoBarbearias = true;

  private readonly MOBILE_BREAKPOINT = 960;

  constructor(
    private router: Router,
    private http: HttpClient,
    private auth: AuthService,
  ) { }

  ngOnInit() {
    this.atualizarViewport();
    this.auth.user$.subscribe((usuario) => (this.usuario = usuario));
    this.carregarBarbearias();

    this.rotaAtiva = this.router.url;
    this.router.events.subscribe(() => {
      this.rotaAtiva = this.router.url;
      if (this.ehVisaoMobile) {
        this.menuMobileAberto = false;
      }
    });
  }

  alternarMenuLateral() {
    if (this.ehVisaoMobile) {
      this.menuMobileAberto = !this.menuMobileAberto;
      return;
    }

    this.menuLateralRecolhido = !this.menuLateralRecolhido;
  }

  alternarMenuMobile() {
    this.menuMobileAberto = !this.menuMobileAberto;
  }

  fecharMenuMobile() {
    this.menuMobileAberto = false;
  }

  @HostListener('window:resize')
  aoRedimensionarJanela() {
    this.atualizarViewport();
  }

  rotaEstaAtiva(caminho: string): boolean {
    return this.rotaAtiva.includes(caminho);
  }

  obterTituloPaginaAtual(): string {
    if (this.rotaAtiva.includes('/dashboard/barbearias')) return 'Barbearias';
    if (this.rotaAtiva.includes('/dashboard/agenda')) return 'Agenda';
    if (this.rotaAtiva.includes('/dashboard/clientes')) return 'Clientes';
    if (this.rotaAtiva.includes('/dashboard/planos')) return 'Planos';
    if (this.rotaAtiva.includes('/dashboard/suporte')) return 'Suporte';
    return 'Painel';
  }

  get totalBarbeariasAtivas(): number {
    return this.barbearias.filter((barbearia) => barbearia.ativa).length;
  }

  get primeiroNomeUsuario(): string {
    return this.usuario?.nome?.split(' ')[0] || 'barbeiro';
  }

  get inicialUsuario(): string {
    return this.usuario?.nome?.trim().charAt(0).toUpperCase() || 'B';
  }

  carregarBarbearias() {
    this.carregandoBarbearias = true;
    this.http.get<BarbeariaResumo[]>('/api/barbearias/owner/me').subscribe({
      next: (barbearias) => {
        this.barbearias = barbearias;
        this.carregandoBarbearias = false;
      },
      error: () => {
        this.barbearias = [];
        this.carregandoBarbearias = false;
      },
    });
  }

  private atualizarViewport() {
    if (typeof window === 'undefined') return;

    const ehMobile = window.innerWidth <= this.MOBILE_BREAKPOINT;
    this.ehVisaoMobile = ehMobile;

    if (ehMobile) {
      this.menuLateralRecolhido = false;
    } else {
      this.menuMobileAberto = false;
    }
  }
}
