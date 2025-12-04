// src/app/auth.service.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { supabase } from './supabase-client'; // Seu cliente Supabase

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  // Cadastro (Sign Up)
  async signUp(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    return { data, error };
  }

  // Login (Sign In)
  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  }

  // Sair (Sign Out)
  async signOut() {
    await supabase.auth.signOut();
    this.router.navigate(['/login']); // Manda de volta pro login
  }

  // Verifica se tem alguém logado
  async isLoggedIn(): Promise<boolean> {
    const { data } = await supabase.auth.getSession();
    return !!data.session; // Retorna true se tiver sessão, false se não
  }
}