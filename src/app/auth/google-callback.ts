import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from './auth.service';
import { getAuthRequestErrorMessage } from './auth-request-error';

@Component({
  selector: 'app-google-callback',
  standalone: true,
  imports: [RouterLink],
  template: `
    <main aria-live="polite">
      <h1>Entrar com Google</h1>
      @if (erro) {
        <p role="alert">{{ erro }}</p>
        <button type="button" (click)="concluir()" [disabled]="carregando">Tentar novamente</button>
        <a routerLink="/login">Voltar ao login</a>
      } @else {
        <p>Confirmando seu acesso…</p>
      }
    </main>
  `,
  styles: `
    main {
      max-width: 480px;
      margin: 12vh auto;
      padding: 24px;
      color: var(--app-text);
    }
    p {
      line-height: 1.6;
    }
    button,
    a {
      display: inline-block;
      margin: 12px 12px 0 0;
      font: inherit;
    }
    button {
      padding: 12px 18px;
      border: 0;
      border-radius: 8px;
      background: #2563eb;
      color: white;
      cursor: pointer;
    }
  `,
})
export class GoogleCallbackComponent implements OnInit {
  private auth = inject(AuthService);
  private router = inject(Router);
  erro = '';
  carregando = false;

  ngOnInit(): void {
    void this.concluir();
  }

  async concluir(): Promise<void> {
    if (this.carregando) return;
    this.carregando = true;
    this.erro = '';
    try {
      const user = await this.auth.completeGoogleLogin();
      await this.router.navigateByUrl(this.auth.homeFor(user), { replaceUrl: true });
    } catch (error) {
      this.erro = getAuthRequestErrorMessage(
        error,
        'Não foi possível confirmar sua sessão. Volte ao login e tente novamente.',
        'O servidor demorou para responder. Tente novamente.',
      );
    } finally {
      this.carregando = false;
    }
  }
}
