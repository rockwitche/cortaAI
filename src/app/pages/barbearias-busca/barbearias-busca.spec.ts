import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { BarbeariasBuscaComponent } from './barbearias-busca';

describe('Busca pública de barbearias', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [BarbeariasBuscaComponent],
    providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
  }));

  it('aguarda os filtros e consulta os cadastros por cidade', () => {
    const fixture = TestBed.createComponent(BarbeariasBuscaComponent);
    const component = fixture.componentInstance;
    const http = TestBed.inject(HttpTestingController);
    component.buscarBarbearias();
    http.expectNone('/api/barbearias');
    expect(component.barbearias.length).toBe(0);
    component.estadoSelecionado = { nome: 'Piauí', sigla: 'PI' };
    component.selecionarCidade({ nome: 'Picos', estado: 'PI' });
    const request = http.expectOne(r => r.url === '/api/barbearias');
    expect(request.request.params.get('estado')).toBe('PI');
    expect(request.request.params.get('cidade')).toBe('Picos');
    request.flush([{ id: 'shop', nome: 'Barbearia de exemplo' }]);
    expect(component.erroBusca).toBe('');
    expect(component.buscaRealizada).toBeTrue();
    http.verify();
    fixture.destroy();
  });
});
