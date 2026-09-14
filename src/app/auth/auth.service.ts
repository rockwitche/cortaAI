import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, firstValueFrom, tap, timeout } from 'rxjs';

export interface User {
  id: string;
  nome: string;
  email: string;
  telefone?: string;
  tipo: 'CLIENTE' | 'BARBEIRO' | 'ADMIN';
  plano?: 'BASICO' | 'PROFISSIONAL' | 'PREMIUM';
  avatar?: string;
}

export interface AuthResponse {
  access_token?: string;
  verificationToken?: string;
  user?: User;
  message?: string;
  requiresVerification?: boolean;
  email?: string;
}

export interface EmailCheckResponse {
  exists: boolean;
  valid: boolean;
  reason: string | null;
}

const LEGACY_TOKEN_KEY = 'token';

/**
 * Compatibilidade temporária para sessões antigas que ainda possuam um token
 * no navegador. Novos logins usam apenas o cookie HttpOnly do servidor.
 */
export function getStoredAuthToken(): string | null {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    return localStorage.getItem(LEGACY_TOKEN_KEY);
  } catch {
    return null;
  }
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly sessionHintKey = 'barberbook:session-hint';
  private readonly cachedUserKey = 'barberbook:cached-user';
  private readonly pendingVerificationTokenKey = 'pending_verification_token';
  // Render's free instances can take close to a minute to wake up. Requests must
  // still be bounded so a failed upstream service never leaves the UI loading forever.
  private readonly requestTimeoutMs = 60_000;
  private readonly apiUrl = this.resolveApiUrl();
  private readonly userSubject = new BehaviorSubject<User | null>(null);
  private sessionRestoreInFlight: Promise<User | null> | null = null;

  user$ = this.userSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    const cachedUser = this.getCachedUser();
    if (cachedUser && this.hasStoredSession()) {
      // Exibe a sessão conhecida imediatamente e a confirma em segundo plano.
      // Nenhuma credencial é gravada nesse cache.
      this.userSubject.next(cachedUser);
    }

    // Não chama /me para visitantes. Isso evita acordar o Render à toa e
    // também elimina uma requisição a cada visita anônima.
    if (this.hasStoredSession()) {
      void this.restoreSession();
    }
  }

  private resolveApiUrl(): string {
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname;
      if (hostname === 'localhost' || hostname === '127.0.0.1') {
        return '/api/auth';
      }
    }

    return 'https://barberbook-awgp.onrender.com/api/auth';
  }

  private buildAuthOptions() {
    const token = getStoredAuthToken();

    return {
      withCredentials: true,
      ...(token ? { headers: new HttpHeaders({ Authorization: `Bearer ${token}` }) } : {}),
    };
  }

  private withTimeout<T>(request: Observable<T>): Observable<T> {
    return request.pipe(timeout({ first: this.requestTimeoutMs }));
  }

  private persistVerificationFromResponse(response: AuthResponse | null | undefined): void {
    if (response?.verificationToken) {
      this.savePendingVerificationToken(response.verificationToken);
    }
  }

  // ========================
  // REGISTRO DE NOVO USUÁRIO
  // ========================
  register(data: {
    nome: string;
    email: string;
    senha: string;
    telefone: string;
    tipo?: 'CLIENTE' | 'BARBEIRO';
  }): Observable<AuthResponse> {
    return this.withTimeout(
      this.http.post<AuthResponse>(`${this.apiUrl}/register`, data, this.buildAuthOptions()),
    ).pipe(
      tap((res) => {
        this.persistVerificationFromResponse(res);
      }),
    );
  }

  checkEmail(email: string): Observable<EmailCheckResponse> {
    return this.withTimeout(
      this.http.get<EmailCheckResponse>(`${this.apiUrl}/check-email`, {
        ...this.buildAuthOptions(),
        params: { email },
      }),
    );
  }

  // ========================
  // VERIFICAÇÃO DE E-MAIL
  // ========================
  verifyEmail(email: string, code: string, verificationToken?: string): Observable<AuthResponse> {
    return this.withTimeout(
      this.http.post<AuthResponse>(
        `${this.apiUrl}/verify-email`,
        { email, code, verificationToken },
        this.buildAuthOptions(),
      ),
    ).pipe(
      tap((res) => {
        this.persistVerificationFromResponse(res);
        if (res.user) {
          this.establishSession(res.user, false);
          this.clearPendingVerificationToken();
        }
      }),
    );
  }

  resendCode(email: string, verificationToken?: string): Observable<AuthResponse> {
    return this.withTimeout(
      this.http.post<AuthResponse>(
        `${this.apiUrl}/resend-code`,
        { email, verificationToken },
        this.buildAuthOptions(),
      ),
    ).pipe(
      tap((res) => {
        this.persistVerificationFromResponse(res);
      }),
    );
  }

  // ========================
  // LOGIN COM EMAIL E SENHA
  // ========================
  login(email: string, senha: string, rememberMe = false): Observable<AuthResponse> {
    return this.withTimeout(
      this.http.post<AuthResponse>(
        `${this.apiUrl}/login`,
        { email, senha, rememberMe },
        this.buildAuthOptions(),
      ),
    ).pipe(
      tap((res) => {
        this.persistVerificationFromResponse(res);
        if (res.user) {
          this.establishSession(res.user, rememberMe);
        }
      }),
    );
  }

  restoreSession(force = false): Promise<User | null> {
    return this.loadUser(force);
  }

  loadUser(force = false): Promise<User | null> {
    if (!force && !this.hasStoredSession()) {
      return Promise.resolve(null);
    }

    if (this.sessionRestoreInFlight) {
      return this.sessionRestoreInFlight;
    }

    const request = firstValueFrom(
      this.withTimeout(this.http.get<User>(`${this.apiUrl}/me`, this.buildAuthOptions())),
    )
      .then((user) => {
        this.updateUserState(user);
        return user;
      })
      .catch((err: { status?: number }) => {
        // Só invalidamos a sessão quando o backend confirmou que ela não é mais válida.
        // Falhas de rede e cold start mantêm o usuário em cache e podem ser tentados novamente.
        if (err?.status === 401 || err?.status === 403) {
          this.userSubject.next(null);
          this.clearSession();
        }

        return this.userSubject.value;
      });

    this.sessionRestoreInFlight = request;
    void request.finally(() => {
      if (this.sessionRestoreInFlight === request) {
        this.sessionRestoreInFlight = null;
      }
    });

    return request;
  }

  // ========================
  // LOGOUT
  // ========================
  logout(): void {
    // A interface encerra a sessão imediatamente; a chamada em segundo plano
    // limpa o cookie HttpOnly no servidor.
    this.userSubject.next(null);
    this.clearSession();
    void this.router.navigate(['/']);

    this.withTimeout(
      this.http.post(`${this.apiUrl}/logout`, {}, { withCredentials: true }),
    ).subscribe({
      error: () => {
        // Mesmo se o servidor estiver indisponível, nenhuma sessão fica guardada no navegador.
      },
    });
  }

  // ========================
  // HELPERS DE SESSÃO
  // ========================
  getToken(): string | null {
    return getStoredAuthToken();
  }

  getPendingVerificationToken(): string | null {
    const storage = this.getStorage(false);
    return storage?.getItem(this.pendingVerificationTokenKey) || null;
  }

  clearPendingVerificationToken(): void {
    this.getStorage(false)?.removeItem(this.pendingVerificationTokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.userSubject.value || this.hasStoredSession();
  }

  get currentUser(): User | null {
    return this.userSubject.value;
  }

  updateUserState(user: User): void {
    this.userSubject.next(user);

    if (this.hasStoredSession()) {
      this.persistCachedUser(user, this.isRememberedSession());
    }
  }

  private establishSession(user: User, rememberMe: boolean): void {
    this.markSessionForCurrentBrowser(rememberMe);
    this.persistCachedUser(user, rememberMe);
    this.userSubject.next(user);
  }

  private markSessionForCurrentBrowser(rememberMe: boolean): void {
    const persistentStorage = this.getStorage(true);
    const sessionStorage = this.getStorage(false);

    persistentStorage?.removeItem(this.sessionHintKey);
    persistentStorage?.removeItem(this.cachedUserKey);
    sessionStorage?.removeItem(this.sessionHintKey);
    sessionStorage?.removeItem(this.cachedUserKey);

    const targetStorage = rememberMe ? persistentStorage : sessionStorage;
    targetStorage?.setItem(this.sessionHintKey, '1');
  }

  private persistCachedUser(user: User, rememberMe: boolean): void {
    try {
      const storage = this.getStorage(rememberMe);
      storage?.setItem(this.cachedUserKey, JSON.stringify(user));
    } catch {
      // O app segue funcionando caso o navegador bloqueie armazenamento local.
    }
  }

  private getCachedUser(): User | null {
    const serialized =
      this.getStorage(true)?.getItem(this.cachedUserKey) ||
      this.getStorage(false)?.getItem(this.cachedUserKey);

    if (!serialized) {
      return null;
    }

    try {
      const user: unknown = JSON.parse(serialized);
      return this.isValidUser(user) ? user : null;
    } catch {
      return null;
    }
  }

  private isValidUser(user: unknown): user is User {
    if (!user || typeof user !== 'object') {
      return false;
    }

    const candidate = user as Partial<User>;
    return (
      typeof candidate.id === 'string' &&
      typeof candidate.nome === 'string' &&
      typeof candidate.email === 'string' &&
      (candidate.tipo === 'CLIENTE' || candidate.tipo === 'BARBEIRO' || candidate.tipo === 'ADMIN')
    );
  }

  private hasStoredSession(): boolean {
    return (
      !!this.getStorage(true)?.getItem(this.sessionHintKey) ||
      !!this.getStorage(false)?.getItem(this.sessionHintKey) ||
      !!getStoredAuthToken()
    );
  }

  private isRememberedSession(): boolean {
    return !!this.getStorage(true)?.getItem(this.sessionHintKey);
  }

  private savePendingVerificationToken(token: string): void {
    this.getStorage(false)?.setItem(this.pendingVerificationTokenKey, token);
  }

  private clearSession(): void {
    const persistentStorage = this.getStorage(true);
    const sessionStorage = this.getStorage(false);

    persistentStorage?.removeItem(this.sessionHintKey);
    persistentStorage?.removeItem(this.cachedUserKey);
    persistentStorage?.removeItem(LEGACY_TOKEN_KEY);
    sessionStorage?.removeItem(this.sessionHintKey);
    sessionStorage?.removeItem(this.cachedUserKey);
  }

  private getStorage(persistent: boolean): Storage | null {
    if (typeof window === 'undefined') {
      return null;
    }

    try {
      return persistent ? localStorage : sessionStorage;
    } catch {
      return null;
    }
  }
}
