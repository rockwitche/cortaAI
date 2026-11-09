import { saveGuestReceipt } from '../../auth/guest-bookings';
import { Component, OnInit, AfterViewInit, OnDestroy, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subscription, finalize, timeout } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService, User } from '../../auth/auth.service';
import { getAuthRequestErrorMessage } from '../../auth/auth-request-error';
import * as L from 'leaflet';

interface Barbeiro {
  ativo?: boolean;
  id: string;
  nome: string;
  foto: string | null;
  horarios: Horario[];
  servicos: Servico[];
}

interface Horario {
  diaSemana: number;
  horaInicio: string;
  horaFim: string;
  almocoInicio: string | null;
  almocoFim: string | null;
}

interface Servico {
  id: string;
  nome: string;
  preco: number;
  duracao: number;
  barbeiroId?: string | null;
}

interface Barbearia {
  id: string;
  nome: string;
  descricao: string | null;
  endereco: string;
  cidade: string;
  estado: string;
  cep: string | null;
  pontoReferencia: string | null;
  latitude: number | null;
  longitude: number | null;
  telefone: string | null;
  whatsapp: string | null;
  foto: string | null;
  fotos: string[];
  barbeiros: Barbeiro[];
  servicos: Servico[];
  owner: { id: string; nome: string; avatar: string | null };
}

@Component({
  selector: 'app-agendar',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './agendar.html',
  styleUrl: './agendar.scss',
})
export class AgendarComponent implements OnInit, AfterViewInit, OnDestroy {
  private readonly LAST_PHONE_STORAGE_KEY = 'barberbook:last-phone';

  barbearia: Barbearia | null = null;
  carregando = true;
  erro = '';

  // Etapa atual: 1=barbeiro, 2=servico, 3=horario, 4=resumo, 5=confirmacao
  etapa = 1;

  // Seleções
  barbeiroSelecionado: Barbeiro | null = null;
  dataSelecionada: string = '';
  horarioSelecionado: string = '';
  servicoSelecionado: Servico | null = null;

  // Horários disponíveis
  datasDisponiveis: { data: string; diaSemana: number; label: string }[] = [];
  horariosGerados: string[] = [];
  horariosOcupados: string[] = [];
  carregandoHorarios = false;
  erroHorarios = '';
  private horariosRequest?: Subscription;
  private readonly destroyRef = inject(DestroyRef);

  // Confirmação
  nomeCliente = '';
  telefoneCliente = '';

  // Modal de sucesso
  agendamentoConfirmado = false;
  salvandoAgendamento = false;
  erroAgendamento = '';

  // Usuário logado
  user: User | null = null;

  // Carousel
  private carouselInterval: any = null;
  indiceCarrossel = 0;

  // Mapa
  private mapa: L.Map | null = null;
  private mapaInicializado = false;

  private apiUrl = '/api';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.telefoneCliente = this.getTelefonePersistido();

    // Carregar usuário logado
    this.authService.user$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((user) => {
      this.user = user;
    });
    if (this.authService.isLoggedIn() && !this.user) {
      this.authService.loadUser();
    }

    const slug = this.route.snapshot.paramMap.get('slug');
    if (!slug) {
      this.router.navigate(['/']);
      return;
    }
    this.carregarBarbearia(slug);
  }

  ngAfterViewInit() {
    setTimeout(() => this.inicializarMapa(), 500);
  }

  ngOnDestroy() {
    this.horariosRequest?.unsubscribe();
    if (this.carouselInterval) clearInterval(this.carouselInterval);
    if (this.mapa) {
      this.mapa.remove();
      this.mapa = null;
    }
  }

  carregarBarbearia(slug: string) {
    this.carregando = true;
    this.http.get<Barbearia>(`${this.apiUrl}/barbearias/${slug}`).subscribe({
      next: (data) => {
        this.barbearia = { ...data, barbeiros: data.barbeiros.filter(b => b.ativo !== false) };
        this.carregando = false;
        this.iniciarCarrossel();
        setTimeout(() => this.inicializarMapa(), 300);
      },
      error: () => {
        this.erro = 'Barbearia não encontrada.';
        this.carregando = false;
      },
    });
  }

  // ==============================
  // Carousel de fotos
  // ==============================
  obterTodasFotos(): string[] {
    if (!this.barbearia) return [];
    const fotos: string[] = [];
    if (this.barbearia.foto) fotos.push(this.barbearia.foto);
    if (this.barbearia.fotos?.length) fotos.push(...this.barbearia.fotos);
    return fotos;
  }

  iniciarCarrossel() {
    if (this.carouselInterval) clearInterval(this.carouselInterval);
    const total = this.obterTodasFotos().length;
    if (total > 1) {
      this.carouselInterval = setInterval(() => {
        this.indiceCarrossel = (this.indiceCarrossel + 1) % total;
      }, 4000);
    }
  }

  carrosselAnterior(event: Event) {
    event.stopPropagation();
    const total = this.obterTodasFotos().length;
    if (total <= 1) return;
    this.indiceCarrossel = (this.indiceCarrossel - 1 + total) % total;
    this.resetarCarrossel();
  }

  carrosselProximo(event: Event) {
    event.stopPropagation();
    const total = this.obterTodasFotos().length;
    if (total <= 1) return;
    this.indiceCarrossel = (this.indiceCarrossel + 1) % total;
    this.resetarCarrossel();
  }

  carrosselIrPara(index: number, event: Event) {
    event.stopPropagation();
    this.indiceCarrossel = index;
    this.resetarCarrossel();
  }

  private resetarCarrossel() {
    if (this.carouselInterval) clearInterval(this.carouselInterval);
    const total = this.obterTodasFotos().length;
    if (total > 1) {
      this.carouselInterval = setInterval(() => {
        this.indiceCarrossel = (this.indiceCarrossel + 1) % total;
      }, 4000);
    }
  }

  // ==============================
  // Utilitários
  // ==============================
  obterUrlFoto(foto: string | null): string {
    if (!foto) return '';
    if (foto.startsWith('http')) return foto;
    return `${foto}`;
  }

  // ==============================
  // Mapa
  // ==============================
  private inicializarMapa() {
    if (this.mapaInicializado || !this.barbearia?.latitude || !this.barbearia?.longitude) return;
    const container = document.getElementById('mapa-agendar');
    if (!container) return;

    const iconDefault = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });
    L.Marker.prototype.options.icon = iconDefault;

    this.mapa = L.map('mapa-agendar', {
      center: [this.barbearia.latitude, this.barbearia.longitude],
      zoom: 16,
      scrollWheelZoom: false,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(this.mapa);

    const popup = document.createElement('div');
    const name = document.createElement('strong');
    name.textContent = this.barbearia.nome;
    popup.append(
      name,
      document.createElement('br'),
      document.createTextNode(this.barbearia.endereco),
    );
    L.marker([this.barbearia.latitude, this.barbearia.longitude])
      .addTo(this.mapa)
      .bindPopup(popup)
      .openPopup();

    this.mapaInicializado = true;
  }

  // ==============================
  // Horários do barbeiro
  // ==============================
  private diasSemanaLabel: Record<number, string> = {
    0: 'Domingo',
    1: 'Segunda',
    2: 'Terça',
    3: 'Quarta',
    4: 'Quinta',
    5: 'Sexta',
    6: 'Sábado',
  };

  getDiasAtivos(barbeiro: Barbeiro): string {
    const abrev: Record<number, string> = {
      0: 'Dom',
      1: 'Seg',
      2: 'Ter',
      3: 'Qua',
      4: 'Qui',
      5: 'Sex',
      6: 'Sáb',
    };
    if (barbeiro.horarios.length === 0) return 'Sem horários';
    if (barbeiro.horarios.length === 7) return 'Todos os dias';
    return barbeiro.horarios.map((h) => abrev[h.diaSemana]).join(', ');
  }

  getHorarioResumo(barbeiro: Barbeiro): string {
    if (barbeiro.horarios.length === 0) return '';
    const h = barbeiro.horarios[0];
    return `${h.horaInicio} - ${h.horaFim}`;
  }

  gerarDatasDisponiveis() {
    if (!this.barbeiroSelecionado) return;
    this.datasDisponiveis = [];
    const hoje = new Date();
    const diasComHorario = this.barbeiroSelecionado.horarios.map((h) => h.diaSemana);

    for (let i = 0; i < 30; i++) {
      const d = new Date(hoje);
      d.setDate(hoje.getDate() + i);
      const diaSemana = d.getDay();
      if (diasComHorario.includes(diaSemana)) {
        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const dd = String(d.getDate()).padStart(2, '0');
        this.datasDisponiveis.push({
          data: `${yyyy}-${mm}-${dd}`,
          diaSemana,
          label: `${dd}/${mm} - ${this.diasSemanaLabel[diaSemana]}`,
        });
      }
    }
  }

  selecionarData(data: string) {
    this.dataSelecionada = data;
    this.horarioSelecionado = '';
    this.gerarHorariosDoDia();
  }

  private getHojeLocal(): string {
    const agora = new Date();
    const yyyy = agora.getFullYear();
    const mm = String(agora.getMonth() + 1).padStart(2, '0');
    const dd = String(agora.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }

  gerarHorariosDoDia() {
    this.horariosRequest?.unsubscribe();
    this.horariosGerados = [];
    this.horariosOcupados = [];
    this.horarioSelecionado = '';
    this.erroHorarios = '';
    this.carregandoHorarios = false;
    if (!this.barbeiroSelecionado || !this.dataSelecionada || !this.servicoSelecionado) return;
    const dia = this.datasDisponiveis.find(d => d.data === this.dataSelecionada);
    if (!dia) return;
    const duracao = this.servicoSelecionado.duracao;
    if (!Number.isInteger(duracao) || duracao <= 0) return;
    const minutos = (hora: string) => {
      const [h, m] = hora.split(':').map(Number);
      return h * 60 + m;
    };
    const agora = new Date();
    const isHoje = this.dataSelecionada === this.getHojeLocal();
    const slots = new Set<string>();
    for (const horario of this.barbeiroSelecionado.horarios.filter(h => h.diaSemana === dia.diaSemana)) {
      const fim = minutos(horario.horaFim);
      const almocoInicio = horario.almocoInicio ? minutos(horario.almocoInicio) : -1;
      const almocoFim = horario.almocoFim ? minutos(horario.almocoFim) : -1;
      for (let atual = minutos(horario.horaInicio); atual + duracao <= fim; atual += duracao) {
        if (almocoInicio >= 0 && atual < almocoFim && atual + duracao > almocoInicio) {
          atual = almocoFim - duracao;
          continue;
        }
        if (isHoje && atual <= agora.getHours() * 60 + agora.getMinutes()) continue;
        slots.add(`${String(Math.floor(atual / 60)).padStart(2, '0')}:${String(atual % 60).padStart(2, '0')}`);
      }
    }
    this.carregandoHorarios = true;
    this.horariosRequest = this.http.get<string[]>(
      `${this.apiUrl}/agendamentos/ocupados/${this.barbeiroSelecionado.id}`,
      { params: { data: this.dataSelecionada, duracao } },
    ).pipe(timeout(60_000), takeUntilDestroyed(this.destroyRef)).subscribe({
      next: ocupados => {
        this.horariosOcupados = ocupados;
        this.horariosGerados = [...slots].filter(h => !ocupados.includes(h)).sort();
        this.carregandoHorarios = false;
      },
      error: error => {
        this.carregandoHorarios = false;
        this.horariosGerados = [];
        this.erroHorarios = getAuthRequestErrorMessage(error,
          'Não foi possível verificar os horários. Tente novamente.',
          'A consulta de horários demorou demais. Tente novamente.');
      },
    });
  }

  selecionarHorario(horario: string) {
    if (this.carregandoHorarios || this.erroHorarios || !this.horariosGerados.includes(horario)) return;
    this.horarioSelecionado = horario;
    this.etapa = 4;
  }

  getDataFormatada(): string {
    if (!this.dataSelecionada) return '';
    const [y, m, d] = this.dataSelecionada.split('-');
    return `${d}/${m}/${y}`;
  }

  // ==============================
  // Fluxo de agendamento
  // ==============================
  selecionarBarbeiro(barbeiro: Barbeiro) {
    this.horariosRequest?.unsubscribe();
    this.horariosGerados = [];
    this.erroHorarios = '';
    this.barbeiroSelecionado = barbeiro;
    this.dataSelecionada = '';
    this.horarioSelecionado = '';
    this.servicoSelecionado = null;
    this.etapa = 2;
  }

  get servicosDoBarbeiro(): Servico[] {
    if (!this.barbeiroSelecionado) return [];
    const especificos = this.barbeiroSelecionado.servicos || [];
    const gerais = this.barbearia?.servicos?.filter(s => !s.barbeiroId) || [];
    return [...new Map([...especificos, ...gerais].map(s => [s.id, s])).values()];
  }

  selecionarServico(servico: Servico) {
    this.horariosRequest?.unsubscribe();
    this.dataSelecionada = '';
    this.horarioSelecionado = '';
    this.horariosGerados = [];
    this.servicoSelecionado = servico;
    this.gerarDatasDisponiveis();
    this.etapa = 3;
  }

  voltarEtapa() {
    if (this.etapa === 2) {
      this.barbeiroSelecionado = null;
      this.dataSelecionada = '';
      this.horarioSelecionado = '';
      this.servicoSelecionado = null;
      this.etapa = 1;
    } else if (this.etapa === 3) {
      this.dataSelecionada = '';
      this.horarioSelecionado = '';
      this.etapa = 2;
    } else if (this.etapa === 4) {
      this.etapa = 3;
    } else if (this.etapa === 5) {
      this.etapa = 4;
    }
  }

  irParaConfirmacao() {
    const telefoneSalvo = this.getTelefonePersistido();

    // Pre-fill com dados do usuário logado
    if (this.user) {
      if (!this.nomeCliente) this.nomeCliente = this.user.nome || '';
      if (!this.telefoneCliente) this.telefoneCliente = this.maskTelefone(this.user.telefone || '');
    }

    if (!this.telefoneCliente && telefoneSalvo) {
      this.telefoneCliente = telefoneSalvo;
    }

    this.persistirTelefone(this.telefoneCliente);
    this.etapa = 5;
  }

  onTelefoneInput(event: Event) {
    const input = event.target as HTMLInputElement;
    const mascarado = this.maskTelefone(input.value);
    this.telefoneCliente = mascarado;
    input.value = mascarado;
    this.persistirTelefone(mascarado);
  }

  get telefoneValido(): boolean {
    const digits = this.telefoneCliente.replace(/\D/g, '');
    return digits.length >= 10 && digits.length <= 11;
  }

  get confirmacaoValida(): boolean {
    return this.nomeCliente.trim().length >= 2 && this.telefoneValido;
  }

  confirmarAgendamento() {
    if (
      this.salvandoAgendamento ||
      !this.dataSelecionada || !this.horarioSelecionado ||
      !this.confirmacaoValida ||
      !this.barbearia ||
      !this.barbeiroSelecionado ||
      !this.servicoSelecionado
    )
      return;

    this.persistirTelefone(this.telefoneCliente);
    this.salvandoAgendamento = true;
    this.erroAgendamento = '';

    const payload = {
      data: this.dataSelecionada,
      horario: this.horarioSelecionado,
      nomeCliente: this.nomeCliente.trim(),
      telefoneCliente: this.telefoneCliente,
      barbeariaId: this.barbearia.id,
      barbeiroId: this.barbeiroSelecionado.id,
      servicoId: this.servicoSelecionado.id,
    };

    this.http.post<{ agendamento: { id: string }; guestAccessToken?: string }>(`${this.apiUrl}/agendamentos`, payload)
      .pipe(timeout(60_000), takeUntilDestroyed(this.destroyRef), finalize(() => this.salvandoAgendamento = false))
      .subscribe({
      next: (res) => {
        if (res.guestAccessToken) saveGuestReceipt(res.agendamento.id, res.guestAccessToken);
        this.salvandoAgendamento = false;
        this.agendamentoConfirmado = true;
      },
      error: (err) => {
        this.salvandoAgendamento = false;
        this.erroAgendamento = err.status === 401
          ? 'Sua sessão expirou. Entre novamente antes de agendar.'
          : getAuthRequestErrorMessage(err, 'Erro ao salvar agendamento.',
            'O servidor demorou para confirmar. Confira seu agendamento antes de tentar novamente.');
      },
    });
  }

  fecharSucesso() {
    this.agendamentoConfirmado = false;
    void this.router.navigate(['/barbearias']);
  }

  voltarInicio() {
    this.router.navigate(['/']);
  }

  private maskTelefone(value: string): string {
    let raw = (value || '').replace(/\D/g, '').slice(0, 11);

    if (raw.length > 6) {
      return `(${raw.slice(0, 2)}) ${raw.slice(2, 7)}-${raw.slice(7)}`;
    }
    if (raw.length > 2) {
      return `(${raw.slice(0, 2)}) ${raw.slice(2)}`;
    }
    if (raw.length > 0) {
      return `(${raw}`;
    }
    return '';
  }

  private persistirTelefone(value: string) {
    if (typeof localStorage === 'undefined') return;

    const digits = (value || '').replace(/\D/g, '');
    if (digits.length >= 10) {
      localStorage.setItem(this.LAST_PHONE_STORAGE_KEY, digits);
    }
  }

  private getTelefonePersistido(): string {
    if (typeof localStorage === 'undefined') return '';

    const saved = localStorage.getItem(this.LAST_PHONE_STORAGE_KEY) || '';
    return this.maskTelefone(saved);
  }
}
