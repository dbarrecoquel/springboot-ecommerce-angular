import { inject, Injectable, PLATFORM_ID, signal, computed } from '@angular/core';
import { UserService } from '../services/user.service';
import { tap } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserStore {

  private token = signal<string | null>(null);
  private user = signal<any | null>(null);
  private loading = signal(false);

  private platformId = inject(PLATFORM_ID);

  isLoading = this.loading;

  // ✅ computed = réactif
  isLoggedIn = computed(() => {
    const token = this.token();

    if (!token) return false;

    if (this.isTokenExpired(token)) {
      this.logout();
      return false;
    }

    return true;
  });

  currentUser = this.user;

  constructor(private userService: UserService) {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');

      if (token && !this.isTokenExpired(token)) {
        this.token.set(token);
      } else {
        this.logout(); 
      }
    }
  }

  private isTokenExpired(token: string): boolean {
    try {
      const decoded: any = jwtDecode(token);
      const exp = decoded.exp;

      if (!exp) return true;

      return Date.now() >= exp * 1000;
    } catch {
      return true;
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

            this.user.set(res.body);
            this.loading.set(false);
          },
          error: () => this.loading.set(false)
        })
      );
  }

  logout() {
    this.token.set(null);
    this.user.set(null);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
    }
  }
}