import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { UserService } from '../services/user.service';
import { tap } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UserStore {

  private token = signal<string | null>(null);
  private user = signal<any | null>(null); // ✅ AJOUT ICI
  private loading = signal(false);

  private platformId = inject(PLATFORM_ID);

  // exposer au template
  isLoading = this.loading;
  isLoggedIn = () => !!this.token();
  currentUser = this.user; // optionnel pour le template

  constructor(private userService: UserService) {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      if (token) this.token.set(token);
    }
  }

  login(email: string, password: string) {
    this.loading.set(true);

    return this.userService.login(email, password)
      .pipe(
        tap({
          next: (res) => {

            const authHeader = res.headers.get('Authorization');

            if (authHeader) {
              const token = authHeader.replace('Bearer ', '');
              this.token.set(token);

              if (isPlatformBrowser(this.platformId)) {
                localStorage.setItem('token', token);
              }
            }

            // ✅ stocker le user
            this.user.set(res.body);

            this.loading.set(false);
          },
          error: () => this.loading.set(false)
        })
      );
  }

  logout() {
    this.token.set(null);
    this.user.set(null); // ✅ important
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
    }
  }
}