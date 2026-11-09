import { ConfirmarEmailComponent } from '../../auth/confirmar-email';
import { Component, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthResponse, AuthService } from '../../auth/auth.service';
import { getAuthRequestErrorMessage } from '../../auth/auth-request-error';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, ConfirmarEmailComponent],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class LoginComponent {
  email = '';
  emailVerificacao = '';
  avisoVerificacao = '';
  senha = '';
  lembrarConta = false;
  erro = '';
  carregando = false;

  constructor(
    private servicoAuth: AuthService,
    private roteador: Router,
    private zonaNg: NgZone,
    rota: ActivatedRoute,
  ) {
    const oauthError = rota.snapshot.queryParamMap.get('oauthError');
    if (oauthError) {
      this.erro =
        oauthError === 'cancelled'
          ? 'A entrada com Google foi cancelada. Você pode tentar novamente.'
          : 'Não foi possível entrar com Google. Tente novamente ou entre com e-mail e senha.';
    }
  }

  entrarComGoogle(): void {
    if (this.carregando) return;
    this.carregando = true;
    this.servicoAuth.loginWithGoogle('CLIENTE', this.lembrarConta);
  }

  aoEnviar() {
    this.erro = '';

    if (this.carregando) {
      return;
    }

    const email = this.email.trim().toLowerCase();
    if (!email || !this.senha) {
      this.erro = 'Informe seu e-mail e senha para entrar.';
      return;
    }

    this.carregando = true;

    this.servicoAuth
      .login(email, this.senha, this.lembrarConta)
      .pipe(finalize(() => (this.carregando = false)))
      .subscribe({
        next: (resposta) => {
          void this.navegarAposLogin(resposta, email);
        },
        error: (erroResposta) => {
          this.erro = getAuthRequestErrorMessage(
            erroResposta,
            'Erro ao fazer login. Tente novamente.',
            'O login demorou mais de um minuto. Tente novamente; se sua conta ainda não foi confirmada, verifique o serviço de e-mail.',
          );
        },
      });
  }

  private async navegarAposLogin(resposta: AuthResponse, email: string): Promise<void> {
    try {
      await this.zonaNg.run(async () => {
        if (resposta.requiresVerification) {
          if (!resposta.verificationToken && !this.servicoAuth.getPendingVerificationToken()) {
            this.erro =
              'Não foi possível iniciar a confirmação de e-mail. Tente fazer login novamente.';
            return;
          }

          this.emailVerificacao = resposta.email || this.email.trim().toLowerCase();
          this.avisoVerificacao = resposta.message || '';
          return;
        }

        if (!resposta.user) {
          this.erro = 'Não foi possível concluir o login. Tente novamente.';
          return;
        }

        const navegou = await this.roteador.navigateByUrl(this.servicoAuth.homeFor(resposta.user));

        if (!navegou) {
          this.erro = 'O login foi concluído, mas não foi possível abrir a próxima página.';
        }
      });
    } catch {
      this.erro = 'O login foi concluído, mas não foi possível abrir a próxima página.';
    }
  }
}
