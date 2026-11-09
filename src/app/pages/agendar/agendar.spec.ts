import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { AgendarComponent } from './agendar';

describe('Disponibilidade do agendamento', () => {
  let component: AgendarComponent;
  let http: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AgendarComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
    });
    component = TestBed.createComponent(AgendarComponent).componentInstance;
    http = TestBed.inject(HttpTestingController);
    component.barbeiroSelecionado = {
      id: 'barber', nome: 'Barbeiro', foto: null, servicos: [],
      horarios: [{ diaSemana: 1, horaInicio: '09:00', horaFim: '14:00',
        almocoInicio: '12:00', almocoFim: '13:00' }],
    };
    component.servicoSelecionado = { id: 'service', nome: 'Corte', preco: 30, duracao: 90 };
    component.datasDisponiveis = [
      { data: '2030-01-07', diaSemana: 1, label: 'Segunda' },
      { data: '2030-01-14', diaSemana: 1, label: 'Segunda' },
    ];
  });
  afterEach(() => http.verify());

  it('respeita duração, almoço, fechamento e ocupação antes de liberar horários', () => {
    component.selecionarData('2030-01-07');
    expect(component.horariosGerados).toEqual([]);
    const request = http.expectOne(r => r.url.includes('/ocupados/'));
    expect(request.request.params.get('duracao')).toBe('90');
    request.flush(['09:00']);
    expect(component.horariosGerados).toEqual(['10:30']);
  });

  it('cancela a consulta anterior ao trocar de data', () => {
    component.selecionarData('2030-01-07');
    const anterior = http.expectOne(r => r.url.includes('/ocupados/'));
    component.selecionarData('2030-01-14');
    expect(anterior.cancelled).toBeTrue();
    http.expectOne(r => r.params.get('data') === '2030-01-14').flush([]);
    expect(component.horariosGerados).toEqual(['09:00', '10:30']);
  });

  it('impede selecionar horários quando a consulta falha', () => {
    component.selecionarData('2030-01-07');
    http.expectOne(r => r.url.includes('/ocupados/')).flush({}, { status: 503, statusText: 'Unavailable' });
    component.selecionarHorario('09:00');
    expect(component.erroHorarios).toBeTruthy();
    expect(component.horariosGerados).toEqual([]);
    expect(component.horarioSelecionado).toBe('');
  });
});
