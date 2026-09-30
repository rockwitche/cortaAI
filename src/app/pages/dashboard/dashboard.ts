import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

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

  private readonly MOBILE_BREAKPOINT = 960;

  constructor(private router: Router) { }

  ngOnInit() {
    this.atualizarViewport();

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