import { TestBed, ComponentFixture } from '@angular/core/testing';
import { provideHttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import {
  provideRouter,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { By } from '@angular/platform-browser';
import { TimeoutError } from 'rxjs';
import { AuthService, User } from './auth.service';
import { ConfirmarEmailComponent } from './confirmar-email';
import { LoginComponent } from '../pages/login/login';
import { RegistroComponent } from '../pages/registro/registro';
import { GoogleCallbackComponent } from './google-callback';
import { PerfilComponent } from '../pages/perfil/perfil';
import { barberGuard } from './barber.guard';
import { sessionGuard } from './session.guard';
import { getAuthRequestErrorMessage } from './auth-request-error';

const cliente: User = {
  id: 'cliente-1',
  nome: 'Cliente',
  email: 'cliente@example.com',
  tipo: 'CLIENTE',
};
const barbeiro: User = { ...cliente, id: 'barbeiro-1', nome: 'Barbeiro', tipo: 'BARBEIRO' };

describe('Integração dos formulários de autenticação — card #17', () => {
  let http: HttpTestingController;
  let auth: AuthService;
  let navigate: jasmine.Spy;
  let fixture: ComponentFixture<unknown>;

  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
    TestBed.configureTestingModule({
      imports: [LoginComponent, RegistroComponent, GoogleCallbackComponent, PerfilComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
    });
    http = TestBed.inject(HttpTestingController);
    auth = TestBed.inject(AuthService);
    navigate = spyOn(TestBed.inject(Router), 'navigateByUrl').and.resolveTo(true);
  });

  afterEach(() => {
    fixture?.destroy();
    http.verify();
    localStorage.clear();
    sessionStorage.clear();
  });

  for (const user of [cliente, barbeiro]) {
    it(`login envia credenciais e encaminha ${user.tipo} para sua área`, async () => {
      const view = TestBed.createComponent(LoginComponent);
      fixture = view;
      view.detectChanges();
      view.componentInstance.email = ` ${user.email.toUpperCase()} `;
      view.componentInstance.senha = 'senha12345';
      view.componentInstance.lembrarConta = true;
      view.componentInstance.aoEnviar();
      view.componentInstance.aoEnviar(); // não duplica o envio enquanto aguarda
      const req = http.expectOne('/api/auth/login');
      expect(req.request.method).toBe('POST');
      expect(req.request.withCredentials).toBeTrue();
      expect(req.request.body).toEqual({
        email: user.email,
        senha: 'senha12345',
        rememberMe: true,
      });
      req.flush({ user, message: 'Login realizado com sucesso.' });
      await view.whenStable();
      expect(auth.currentUser).toEqual(user);
      expect(localStorage.getItem('token')).toBeNull();
      expect(localStorage.getItem('barberbook:session-hint')).toBe('1');
      expect(navigate).toHaveBeenCalledWith(
        user.tipo === 'BARBEIRO' ? '/dashboard' : '/barbearias',
      );
      expect(view.componentInstance.carregando).toBeFalse();
    });
  }

  it('cadastro de barbeiro passa pela confirmação e estabelece sessão', async () => {
    const view = TestBed.createComponent(RegistroComponent);
    fixture = view;
    const form = view.componentInstance;
    view.detectChanges();
    Object.assign(form, {
      nome: ' Barbeiro ',
      email: barbeiro.email,
      senha: 'senha12345',
      confirmarSenha: 'senha12345',
      telefone: '11999999999',
      tipo: 'BARBEIRO',
      emailValido: true,
      telefoneValido: true,
    });
    form.aoEnviar();
    const registration = http.expectOne('/api/auth/register');
    expect(registration.request.body.tipo).toBe('BARBEIRO');
    expect(registration.request.body.nome).toBe('Barbeiro');
    registration.flush({
      requiresVerification: true,
      email: barbeiro.email,
      verificationToken: 'verification-only',
      message: 'Código enviado.',
    });
    await view.whenStable();
    view.detectChanges();
    expect(auth.currentUser).toBeNull();
    expect(navigate).not.toHaveBeenCalled();
    const confirmation = view.debugElement.query(By.directive(ConfirmarEmailComponent))
      .componentInstance as ConfirmarEmailComponent;
    confirmation.codigo = '123456';
    confirmation.confirmar();
    const verify = http.expectOne('/api/auth/verify-email');
    expect(verify.request.body).toEqual({
      email: barbeiro.email,
      code: '123456',
      verificationToken: 'verification-only',
    });
    verify.flush({ user: barbeiro, rememberMe: false });
    await view.whenStable();
    expect(auth.currentUser).toEqual(barbeiro);
    expect(auth.getPendingVerificationToken()).toBeNull();
    expect(navigate).toHaveBeenCalledWith('/dashboard');
  });

  it('mostra erro de login e permite tentar novamente', () => {
    const view = TestBed.createComponent(LoginComponent);
    fixture = view;
    view.componentInstance.email = cliente.email;
    view.componentInstance.senha = 'errada';
    view.componentInstance.aoEnviar();
    http
      .expectOne('/api/auth/login')
      .flush(
        { message: 'E-mail ou senha incorretos.' },
        { status: 401, statusText: 'Unauthorized' },
      );
    view.detectChanges();
    expect(view.nativeElement.querySelector('[role="alert"]').textContent).toContain(
      'E-mail ou senha incorretos.',
    );
    expect(view.componentInstance.carregando).toBeFalse();
    expect(auth.currentUser).toBeNull();
    expect(navigate).not.toHaveBeenCalled();
  });

  it('falha no envio de e-mail mantém a etapa de confirmação com opção de reenviar', async () => {
    const view = TestBed.createComponent(LoginComponent);
    fixture = view;
    view.componentInstance.email = cliente.email;
    view.componentInstance.senha = 'senha12345';
    view.componentInstance.aoEnviar();
    http.expectOne('/api/auth/login').flush({
      requiresVerification: true,
      email: cliente.email,
      verificationToken: 'pending',
      verificationEmailSent: false,
      message: 'Não conseguimos enviar o e-mail. Use Reenviar código.',
    });
    await view.whenStable();
    view.detectChanges();
    expect(view.nativeElement.textContent).toContain('Não conseguimos enviar');
    const confirmation = view.debugElement.query(By.directive(ConfirmarEmailComponent))
      .componentInstance as ConfirmarEmailComponent;
    confirmation.reenviar();
    const resend = http.expectOne('/api/auth/resend-code');
    expect(resend.request.body.verificationToken).toBe('pending');
    resend.flush({ verificationToken: 'renewed', message: 'Código enviado.' });
    expect(auth.getPendingVerificationToken()).toBe('renewed');
    expect(confirmation.mensagem).toBe('Código enviado.');
  });

  it('Google usa a escolha de barbeiro sem exigir preencher e-mail e senha', () => {
    const view = TestBed.createComponent(RegistroComponent);
    fixture = view;
    const google = spyOn(auth, 'loginWithGoogle');
    view.componentInstance.tipo = 'BARBEIRO';
    view.detectChanges();
    const button: HTMLButtonElement = view.nativeElement.querySelector('.botao-google');
    expect(button.disabled).toBeFalse();
    button.click();
    expect(google).toHaveBeenCalledWith('BARBEIRO');
  });

  it('retorno do Google carrega a sessão e encaminha ao painel', async () => {
    const view = TestBed.createComponent(GoogleCallbackComponent);
    fixture = view;
    view.detectChanges();
    http.expectOne('/api/auth/me').flush(barbeiro);
    await view.whenStable();
    expect(auth.currentUser).toEqual(barbeiro);
    expect(sessionStorage.getItem('barberbook:session-hint')).toBe('1');
    expect(navigate).toHaveBeenCalledWith('/dashboard', { replaceUrl: true });
  });

  it('retorno do Google com sessão ausente mostra erro sem redirecionar', async () => {
    const view = TestBed.createComponent(GoogleCallbackComponent);
    fixture = view;
    view.detectChanges();
    http.expectOne('/api/auth/me').flush({}, { status: 401, statusText: 'Unauthorized' });
    await view.whenStable();
    view.detectChanges();
    expect(view.nativeElement.querySelector('[role="alert"]')).not.toBeNull();
    expect(navigate).not.toHaveBeenCalled();
  });

  it('sessão de barbeiro em cache não autoriza painel quando a API falha', async () => {
    auth.updateUserState(barbeiro);
    const result = TestBed.runInInjectionContext(() =>
      barberGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot),
    );
    http.expectOne('/api/auth/me').flush({}, { status: 503, statusText: 'Unavailable' });
    const route = await result;
    expect(String(route)).toBe('/login');
  });

  it('cliente autenticado não acessa o painel de barbeiro', async () => {
    const result = TestBed.runInInjectionContext(() =>
      barberGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot),
    );
    http.expectOne('/api/auth/me').flush(cliente);
    expect(String(await result)).toBe('/barbearias');
  });

  it('barbeiro confirmado acessa o painel', async () => {
    const result = TestBed.runInInjectionContext(() =>
      barberGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot),
    );
    http.expectOne('/api/auth/me').flush(barbeiro);
    expect(await result).toBeTrue();
  });

  it('trata lista de validações, falha de rede, timeout e resposta HTML', () => {
    const message = (error: unknown) =>
      getAuthRequestErrorMessage(error, 'Falha no acesso.', 'Demorou demais.');
    expect(
      message(
        new HttpErrorResponse({
          status: 400,
          error: { message: ['E-mail inválido.', 'Senha curta.'] },
        }),
      ),
    ).toBe('E-mail inválido. Senha curta.');
    expect(message(new HttpErrorResponse({ status: 0 }))).toContain('Verifique sua internet');
    expect(message(new TimeoutError())).toBe('Demorou demais.');
    expect(
      message(new HttpErrorResponse({ status: 502, error: '<html>proxy error</html>' })),
    ).toContain('servidor encontrou um problema');
  });

  it('resposta atrasada de restauração não reabre uma sessão após sair', async () => {
    const restore = auth.restoreSession(true);
    const pending = http.expectOne('/api/auth/me');
    auth.logout();
    http.expectOne('/api/auth/logout').flush({ message: 'Logout realizado com sucesso.' });
    pending.flush(barbeiro);
    expect(await restore).toBeNull();
    expect(auth.currentUser).toBeNull();
    expect(sessionStorage.getItem('barberbook:session-hint')).toBeNull();
  });

  it('perfil permite cliente confirmado e redireciona sessão expirada', async () => {
    const runGuard = () => TestBed.runInInjectionContext(() =>
      sessionGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot));
    const allowed = runGuard();
    http.expectOne('/api/auth/me').flush(cliente);
    expect(await allowed).toBeTrue();
    const expired = runGuard();
    http.expectOne('/api/auth/me').flush({}, { status: 401, statusText: 'Unauthorized' });
    expect(String(await expired)).toBe('/login');
    expect(auth.currentUser).toBeNull();
  });

  it('perfil envia a foto no campo esperado e permite remover a foto', async () => {
    auth.login(cliente.email, 'senha12345').subscribe();
    http.expectOne('/api/auth/login').flush({ user: cliente });
    const view = TestBed.createComponent(PerfilComponent);
    fixture = view;
    view.detectChanges();
    const file = new File(['image-test'], 'avatar.png', { type: 'image/png' });
    view.componentInstance.onAvatarSelected({ target: { files: [file], value: '' } } as unknown as Event);
    const upload = http.expectOne('/api/user/avatar');
    expect(upload.request.method).toBe('POST');
    expect((upload.request.body as FormData).get('file')).toBe(file);
    expect((upload.request.body as FormData).has('avatar')).toBeFalse();
    upload.flush({ message: 'Foto atualizada.', avatar: 'data:image/png;base64,aW1hZ2U=' });
    http.expectOne('/api/auth/me').flush({ ...cliente, avatar: 'data:image/png;base64,aW1hZ2U=' });
    await view.whenStable();
    spyOn(window, 'confirm').and.returnValue(true);
    view.componentInstance.excluirAvatar();
    const remove = http.expectOne('/api/user/avatar');
    expect(remove.request.method).toBe('DELETE');
    remove.flush({ message: 'Foto removida.', user: cliente });
    http.expectOne('/api/auth/me').flush(cliente);
    await view.whenStable();
    expect(view.componentInstance.user?.avatar).toBeUndefined();
  });

  it('exclusão da conta usa o endpoint correto e limpa a sessão local', () => {
    auth.login(cliente.email, 'senha12345').subscribe();
    http.expectOne('/api/auth/login').flush({ user: cliente });
    const view = TestBed.createComponent(PerfilComponent);
    fixture = view;
    view.detectChanges();
    spyOn(window, 'confirm').and.returnValue(true);
    view.componentInstance.excluirConta();
    const remove = http.expectOne('/api/user/account');
    expect(remove.request.method).toBe('DELETE');
    remove.flush({ message: 'Conta excluída.' });
    http.expectOne('/api/auth/logout').flush({}, { status: 401, statusText: 'Unauthorized' });
    expect(auth.currentUser).toBeNull();
    expect(sessionStorage.getItem('barberbook:session-hint')).toBeNull();
  });
});
