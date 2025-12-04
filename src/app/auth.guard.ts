// src/app/auth.guard.ts
import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from './auth';

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Pergunta ao serviço se está logado
  const isLoggedIn = await authService.isLoggedIn();

  if (isLoggedIn) {
    return true; // Pode passar
  } else {
    router.navigate(['/login']); // Barrado! Vai pro login
    return false;
  }
};