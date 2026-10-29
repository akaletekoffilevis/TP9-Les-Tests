import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(AuthService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('stocke le jeton après une connexion valide', () => {
    service
      .login({ email: 'ada@exemple.fr', password: 'secret' })
      .subscribe((response) => {
        expect(response.token).toBe('jwt-123');
        expect(service.isAuthenticated()).toBeTrue();
      });

    const request = http.expectOne('/api/auth/login');
    expect(request.request.method).toBe('POST');
    request.flush({ token: 'jwt-123', redirectTo: '/dashboard' });
  });
});
