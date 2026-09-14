import { Component, Input, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from './auth.service';
import { getAuthRequestErrorMessage } from './auth-request-error';

/** Confirma o cadastro dentro do formulário, sem acrescentar outra página. */
@Component({
  selector: 'app-confirmar-email',
  standalone: true,
  imports: [FormsModule],
  template: `
    <form (ngSubmit)="confirmar()">
      <p>Enviamos um código de confirmação para <strong>{{ email }}</strong>.</p>
      <label for="codigo-confirmacao">Código de 6 dígitos</label>
      <input id="codigo-confirmacao" name="codigo" [(ngModel)]="codigo"
        inputmode="numeric" autocomplete="one-time-code" pattern="[0-9]{6}"
        maxlength="6" required />
      @if (erro) { <p role="alert">{{ erro }}</p> }
      @if (mensagem) { <p role="status">{{ mensagem }}</p> }
      <button type="submit" [disabled]="ocupado || !codigoValido">
        {{ ocupado ? 'Aguarde...' : 'Confirmar e entrar' }}
      </button>
      <button type="button" [disabled]="ocupado" (click)="reenviar()">Reenviar código</button>
    </form>
  `,
  styles: `
    :host { display: block; }
    form { display: grid; gap: 16px; color: var(--app-text); }
    p { line-height: 1.6; overflow-wrap: anywhere; }
    input, button { padding: 14px; border-radius: 12px; font: inherit; }
    input { background: var(--app-surface); color: var(--app-text); border: 1px solid var(--app-border); }
    button { cursor: pointer; border: 0; background: #2563eb; color: white; }
    button:disabled { cursor: wait; opacity: .6; }
    [role=alert] { color: #dc2626; }
  `,
})
export class ConfirmarEmailComponent {
  @Input({ required: true }) email = '';
  codigo = '';
  erro = '';
  mensagem = '';
  ocupado = false;
  private auth = inject(AuthService);
  private router = inject(Router);

  get codigoValido() { return /^\d{6}$/.test(this.codigo); }

  confirmar() {
    if (this.ocupado || !this.codigoValido) return;
    const token = this.auth.getPendingVerificationToken();
    if (!token) { this.erro = 'Sua confirmação expirou. Faça login para receber um novo código.'; return; }
    this.ocupado = true;
    this.erro = '';
    this.auth.verifyEmail(this.email, this.codigo, token)
      .pipe(finalize(() => this.ocupado = false))
      .subscribe({
        next: resposta => {
          if (resposta.user) void this.router.navigate(['/barbearias']);
          else this.erro = 'Não foi possível confirmar o acesso. Tente novamente.';
        },
        error: erro => this.erro = getAuthRequestErrorMessage(erro, 'Não foi possível confirmar o código.', 'A confirmação demorou demais. Tente novamente.'),
      });
  }

  reenviar() {
    if (this.ocupado) return;
    const token = this.auth.getPendingVerificationToken();
    if (!token) { this.erro = 'Sua confirmação expirou. Faça login novamente.'; return; }
    this.ocupado = true;
    this.erro = '';
    this.mensagem = '';
    this.auth.resendCode(this.email, token)
      .pipe(finalize(() => this.ocupado = false))
      .subscribe({
        next: () => this.mensagem = 'Novo código enviado para seu e-mail.',
        error: erro => this.erro = getAuthRequestErrorMessage(erro, 'Não foi possível reenviar o código.', 'O reenvio demorou demais. Tente novamente.'),
      });
  }
}
