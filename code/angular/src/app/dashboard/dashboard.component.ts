import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  template: `
    <main class="card">
      <h1>Tableau de bord</h1>
      <p>Connexion réussie. Le jeton JWT est stocké dans le navigateur.</p>
    </main>
  `,
})
export class DashboardComponent {}
