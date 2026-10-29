import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { tap } from 'rxjs';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  redirectTo: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly api = '/api/auth';
  private readonly currentToken = signal<string | null>(
    localStorage.getItem('token'),
  );

  readonly token = this.currentToken.asReadonly();

  constructor(private readonly http: HttpClient) {}

  login(credentials: LoginRequest) {
    return this.http
      .post<LoginResponse>(`${this.api}/login`, credentials)
      .pipe(
        tap((response) => {
          localStorage.setItem('token', response.token);
          this.currentToken.set(response.token);
        }),
      );
  }

  isAuthenticated(): boolean {
    return this.currentToken() !== null;
  }
}
