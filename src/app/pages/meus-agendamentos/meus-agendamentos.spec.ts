import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { MeusAgendamentosComponent } from './meus-agendamentos';

describe('Meus agendamentos', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [MeusAgendamentosComponent],
    providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
  }));
  it('consulta a sessão atual e exibe os dados da reserva', () => {
    const fixture = TestBed.createComponent(MeusAgendamentosComponent);
    const http = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
    http.expectOne('/api/agendamentos/meus').flush([{
      id: 'booking', data: '2030-01-07', horario: '10:30', status: 'PENDENTE',
      barbearia: { nome: 'Barbearia Teste', endereco: 'Rua A' },
      barbeiro: { nome: 'Carlos' }, servico: { nome: 'Corte', duracao: 30, preco: 25 },
    }]);
    fixture.changeDetectorRef.markForCheck();
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Barbearia Teste');
    expect(fixture.nativeElement.textContent).toContain('07/01/2030 às 10:30');
    expect(fixture.nativeElement.textContent).toContain('Pendente');
    http.verify();
  });
});
