import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserStore } from '../stores/user.store';

export const authGuard: CanActivateFn = (route, state) => {

  const userStore = inject(UserStore);
  const router = inject(Router);

  if (userStore.isLoggedIn()) {
    return true;
  }
  router.navigate(['/login']);
  return false;
};