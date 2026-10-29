import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  template: `
    <main class="card">
      <h1>Connexion</h1>
      <form (ngSubmit)="submit()">
        <label>
          Email
          <input
            name="email"
            type="email"
            data-cy="email"
            [(ngModel)]="email"
            required
          />
        </label>
        <label>
          Mot de passe
          <input
            name="password"
            type="password"
            data-cy="password"
            [(ngModel)]="password"
            required
          />
        </label>
        <button data-cy="submit" type="submit">Se connecter</button>
      </form>
      @if (error) {
        <p class="error">{{ error }}</p>
      }
    </main>
  `,
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';

  constructor(
    private readonly auth: AuthService,
    private readonly router: Router,
  ) {}

  submit(): void {
    this.auth.login({ email: this.email, password: this.password }).subscribe({
      next: (response) => this.router.navigateByUrl(response.redirectTo),
      error: () => (this.error = 'Identifiants incorrects'),
    });
  }
}
