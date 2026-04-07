import { inject, Injectable, PLATFORM_ID, signal, computed } from '@angular/core';
import { UserService } from '../services/user.service';
import { tap } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { jwtDecode } from 'jwt-decode';
import { Address } from '../models/address/address';
import { User } from '../models/user/user';
import { UpdatePasswordRequest } from '../models/user/updatePasswordRequest';


@Injectable({
  providedIn: 'root'
})
export class UserStore {

  private token = signal<string | null>(null);
  private user = signal<any | null>(null);
  private loading = signal(false);
  private _addresses = signal<Address[]>([]);
  private selectedAddress = signal<Address | null>(null);
  private platformId = inject(PLATFORM_ID);
  private addressesLoaded = signal(false);

  addressesLoaded$ = this.addressesLoaded;
  isLoading = this.loading;

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
  addressesList = this._addresses;
  selectedAddress$ = this.selectedAddress;

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
  loadProfile(){
    this.loading.set(true);
    return this.userService.getProfile().subscribe({
            next : (res) => {
                this.user.set(res);
                this.loading.set(false);
            },
            error: () => this.loading.set(false)
        }
    )
  }
  loadAddresses() {
    this.loading.set(true);
    this.addressesLoaded.set(false);
    this.userService.getAddresses().subscribe({
      next: (res) => {
        this._addresses.set(res);
        this.loading.set(false);
        this.addressesLoaded.set(true);
      },
      error: () => this.loading.set(false)
    });
  }
  selectAddress(address: Address) {
    this.selectedAddress.set(address);
  }

  clearSelection() {
    this.selectedAddress.set(null);
  }

  createAddress(address: Address) {
    this.userService.createAddress(address).subscribe({
      next: (res) => {
        this._addresses.update(list => [...list, res]);
        this.clearSelection();
      }
    });
  }

  updateAddress(address: Address) {
    this.userService.updateAddress(address).subscribe({
      next: (res) => {
        this._addresses.update(list =>
          list.map(a => a.id === res.id ? res : a)
        );
        this.clearSelection();
      }
    });
  }
  deleteAddress(address: Address) {
    this.userService.deleteAddress(address.id).subscribe({
      next: (res) => {
        this.loadAddresses()
        this.clearSelection();
      }
    });
  }

  logout() {
    this.token.set(null);
    this.user.set(null);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
    }
  }
  updateProfile(request: User) {
    this.userService.updateProfile(request).subscribe({
      next: (res) => {
        this.user.set(res);
      }
    });
  }
  updatePassword(request: UpdatePasswordRequest) {
    this.loading.set(true);
    this.userService.updatePassword(request).subscribe({
      next: () => {
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
   
  }
}