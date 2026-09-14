import { Component, OnInit, OnDestroy, ViewEncapsulation, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { finalize, Subscription, timeout } from 'rxjs';
import { AuthService, User } from '../../auth/auth.service';

interface Estado {
  nome: string;
  sigla: string;
}

interface Cidade {
  nome: string;
  estado: string;
}

@Component({
  selector: 'app-barbearias-busca',
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './barbearias-busca.html',
  styleUrl: './barbearias-busca.scss',
  encapsulation: ViewEncapsulation.None,
})
export class BarbeariasBuscaComponent implements OnInit, OnDestroy {
  private readonly CHAVE_CACHE_ESTADOS = 'barberbook:ibge-estados:v1';
  private readonly PREFIXO_CACHE_CIDADES = 'barberbook:ibge-cidades:v1:';

  estados: Estado[] = [];
  cidadesFiltradas: Cidade[] = [];

  estadoSelecionado: Estado | null = null;
  cidadeSelecionada: Cidade | null = null;

  estadoAberto = false;
  cidadeAberta = false;
  filtroEstado = '';
  filtroCidade = '';

  // Barbearias
  barbearias: any[] = [];
  buscandoBarbearias = false;
  buscaRealizada = false;
  erroBusca = '';
  erroLocalizacao = '';
  private usuarioSubscription?: Subscription;
  private intervalosCarrossel: Map<string, any> = new Map();
  private buscaAtiva?: Subscription;
  private sequenciaBusca = 0;

  usuario: User | null = null;
  menuAberto = false;

  private urlApi = '/api/barbearias';

  constructor(
    private clienteHttp: HttpClient,
    private servicoAuth: AuthService,
  ) {}

  ngOnInit() {
    this.usuarioSubscription = this.servicoAuth.user$.subscribe((usuario) => {
      this.usuario = usuario;
    });

    if (this.servicoAuth.isLoggedIn() && !this.usuario) {
      this.servicoAuth.loadUser();
    }

    this.carregarEstados();
  }

  // ==============================
  // Estado dropdown
  // ==============================
  alternarEstado() {
    this.estadoAberto = !this.estadoAberto;
    this.cidadeAberta = false;
    if (this.estadoAberto) {
      this.filtroEstado = '';
    }
  }

  get listaEstadosFiltrados(): Estado[] {
    if (!this.filtroEstado.trim()) return this.estados;
    const termo = this.filtroEstado.toLowerCase();
    return this.estados.filter((estado) => estado.nome.toLowerCase().includes(termo));
  }

  selecionarEstado(estado: Estado) {
    this.erroLocalizacao = '';
    this.estadoSelecionado = estado;
    this.estadoAberto = false;
    this.filtroEstado = '';

    // Reset cidade
    this.cidadeSelecionada = null;
    this.cidadesFiltradas = [];
    this.cancelarBusca();
    this.limparCarrosseis();
    this.barbearias = [];
    this.buscaRealizada = false;

    const cidadesEmCache = this.lerCache<Cidade[]>(`${this.PREFIXO_CACHE_CIDADES}${estado.sigla}`);
    if (cidadesEmCache) {
      this.cidadesFiltradas = cidadesEmCache;
      return;
    }

    this.clienteHttp
      .get<any[]>(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estado.sigla}/municipios?orderBy=nome`,
      )
      .pipe(timeout(20_000))
      .subscribe({ next: (dados) => {
        const cidades = dados.map((cidade) => ({
          nome: cidade.nome,
          estado: estado.sigla,
        }));
        this.salvarCache(`${this.PREFIXO_CACHE_CIDADES}${estado.sigla}`, cidades);

        if (this.estadoSelecionado?.sigla === estado.sigla) {
          this.cidadesFiltradas = cidades;
        }
      }, error: () => {
        if (this.estadoSelecionado?.sigla === estado.sigla) {
          this.erroLocalizacao = 'Não foi possível carregar as cidades do IBGE. Tente novamente.';
        }
      } });
  }

  limparEstado(event: Event) {
    event.stopPropagation();
    this.estadoSelecionado = null;
    this.cidadeSelecionada = null;
    this.cidadesFiltradas = [];
    this.estadoAberto = false;
    this.cancelarBusca();
    this.limparCarrosseis();
    this.barbearias = [];
    this.buscaRealizada = false;
  }

  // ==============================
  // Cidade dropdown
  // ==============================
  alternarCidade() {
    if (!this.estadoSelecionado) return;
    this.cidadeAberta = !this.cidadeAberta;
    this.estadoAberto = false;
    if (this.cidadeAberta) {
      this.filtroCidade = '';
    }
  }

  get listaCidadesFiltradas(): Cidade[] {
    if (!this.filtroCidade.trim()) return this.cidadesFiltradas;
    const termo = this.filtroCidade.toLowerCase();
    return this.cidadesFiltradas.filter((cidade) => cidade.nome.toLowerCase().includes(termo));
  }

  selecionarCidade(cidade: Cidade) {
    this.cidadeSelecionada = cidade;
    this.cidadeAberta = false;
    this.filtroCidade = '';
    this.buscarBarbearias();
  }

  limparCidade(event: Event) {
    event.stopPropagation();
    this.cidadeSelecionada = null;
    this.cidadeAberta = false;
    this.cancelarBusca();
    this.limparCarrosseis();
    this.barbearias = [];
    this.buscaRealizada = false;
  }

  // ==============================
  // Buscar barbearias
  // ==============================
  buscarBarbearias() {
    if (!this.estadoSelecionado || !this.cidadeSelecionada) return;

    this.cancelarBusca();
    const identificadorBusca = this.sequenciaBusca;
    this.buscandoBarbearias = true;
    this.buscaRealizada = false;
    this.limparCarrosseis();

    this.buscaAtiva = this.clienteHttp
      .get<any[]>(`${this.urlApi}/search`, {
        params: {
          estado: this.estadoSelecionado.sigla,
          cidade: this.cidadeSelecionada.nome,
        },
      })
      .pipe(
        timeout(8_000),
        finalize(() => {
          if (identificadorBusca !== this.sequenciaBusca) {
            return;
          }

          this.buscandoBarbearias = false;
          this.buscaRealizada = true;
          this.buscaAtiva = undefined;
        }),
      )
      .subscribe({
        next: (dados) => {
          if (identificadorBusca !== this.sequenciaBusca) {
            return;
          }

          this.barbearias = dados;
          this.iniciarCarrosseis();
        },
        error: () => {
          if (identificadorBusca !== this.sequenciaBusca) {
            return;
          }

          this.barbearias = [];
          this.erroBusca = 'Não foi possível consultar as barbearias. Tente novamente.';
          this.limparCarrosseis();
        },
      });
  }

  obterFotoPrincipal(barbearia: any): string {
    if (barbearia.foto) return barbearia.foto;
    if (barbearia.fotos && barbearia.fotos.length > 0) return barbearia.fotos[0];
    return '';
  }

  obterTodasFotos(barbearia: any): string[] {
    const fotos: string[] = [];
    if (barbearia.foto) fotos.push(barbearia.foto);
    if (barbearia.fotos?.length) fotos.push(...barbearia.fotos);
    return fotos;
  }

  // ==============================
  // Carrossel
  // ==============================
  ngOnDestroy() {
    this.usuarioSubscription?.unsubscribe();
    this.cancelarBusca();
    this.limparCarrosseis();
  }

  iniciarCarrosseis() {
    this.limparCarrosseis();
    for (const barbearia of this.barbearias) {
      barbearia._indiceCarrossel = 0;
      const totalFotos = this.obterTodasFotos(barbearia).length;
      if (totalFotos > 1) {
        const intervalo = setInterval(() => {
          barbearia._indiceCarrossel = ((barbearia._indiceCarrossel || 0) + 1) % totalFotos;
        }, 4000);
        this.intervalosCarrossel.set(barbearia.id, intervalo);
      }
    }
  }

  limparCarrosseis() {
    this.intervalosCarrossel.forEach((intervalo) => clearInterval(intervalo));
    this.intervalosCarrossel.clear();
  }

  carrosselAnterior(barbearia: any, event: Event) {
    event.stopPropagation();
    const total = this.obterTodasFotos(barbearia).length;
    if (total <= 1) return;
    barbearia._indiceCarrossel = ((barbearia._indiceCarrossel || 0) - 1 + total) % total;
    this.reiniciarTimerCarrossel(barbearia);
  }

  carrosselProximo(barbearia: any, event: Event) {
    event.stopPropagation();
    const total = this.obterTodasFotos(barbearia).length;
    if (total <= 1) return;
    barbearia._indiceCarrossel = ((barbearia._indiceCarrossel || 0) + 1) % total;
    this.reiniciarTimerCarrossel(barbearia);
  }

  carrosselIrPara(barbearia: any, indice: number, event: Event) {
    event.stopPropagation();
    barbearia._indiceCarrossel = indice;
    this.reiniciarTimerCarrossel(barbearia);
  }

  private reiniciarTimerCarrossel(barbearia: any) {
    const existente = this.intervalosCarrossel.get(barbearia.id);
    if (existente) clearInterval(existente);
    const total = this.obterTodasFotos(barbearia).length;
    if (total > 1) {
      const intervalo = setInterval(() => {
        barbearia._indiceCarrossel = ((barbearia._indiceCarrossel || 0) + 1) % total;
      }, 4000);
      this.intervalosCarrossel.set(barbearia.id, intervalo);
    }
  }

  // ==============================
  // Cliques globais
  // ==============================
  alternarMenu() {
    this.menuAberto = !this.menuAberto;
  }

  @HostListener('document:click', ['$event'])
  aoClicarDocumento(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.menu-usuario')) {
      this.menuAberto = false;
    }
    if (!target.closest('.seletor-estado')) {
      this.estadoAberto = false;
    }
    if (!target.closest('.seletor-cidade')) {
      this.cidadeAberta = false;
    }
  }

  sair() {
    this.menuAberto = false;
    this.servicoAuth.logout();
  }

  obterUrlAvatar(): string {
    if (this.usuario?.avatar) {
      if (this.usuario.avatar.startsWith('http')) return this.usuario.avatar;
      return `${this.usuario.avatar}`;
    }
    return '';
  }

  private carregarEstados() {
    this.erroLocalizacao = '';
    const estadosEmCache = this.lerCache<Estado[]>(this.CHAVE_CACHE_ESTADOS);
    if (estadosEmCache) {
      this.estados = estadosEmCache;
      return;
    }

    this.clienteHttp
      .get<any[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome')
      .pipe(timeout(20_000))
      .subscribe({ next: (dados) => {
        this.estados = dados.map((estado) => ({
          nome: estado.nome,
          sigla: estado.sigla,
        }));
        this.salvarCache(this.CHAVE_CACHE_ESTADOS, this.estados);
      }, error: () => {
        this.erroLocalizacao = 'Não foi possível carregar os estados do IBGE. Tente novamente.';
      } });
  }

  tentarLocalizacao() {
    if (this.estadoSelecionado) this.selecionarEstado(this.estadoSelecionado);
    else this.carregarEstados();
  }

  private cancelarBusca() {
    this.erroBusca = '';
    this.sequenciaBusca += 1;
    this.buscaAtiva?.unsubscribe();
    this.buscaAtiva = undefined;
    this.buscandoBarbearias = false;
  }

  private lerCache<T>(chave: string): T | null {
    if (typeof window === 'undefined') {
      return null;
    }

    try {
      const valor = sessionStorage.getItem(chave);
      return valor ? (JSON.parse(valor) as T) : null;
    } catch {
      return null;
    }
  }

  private salvarCache(chave: string, valor: unknown) {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      sessionStorage.setItem(chave, JSON.stringify(valor));
    } catch {
      // A busca continua disponível mesmo se o navegador bloquear o cache.
    }
  }
}
