// src/app/login/login.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth'; // Importe o serviço

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {

  email = '';
  password = '';
  errorMessage = '';
  isLoading = false;

  constructor(private authService: AuthService, private router: Router) {}

  async onLogin() {
    this.isLoading = true;
    this.errorMessage = '';
    
    const { error } = await this.authService.signIn(this.email, this.password);
    
    this.isLoading = false;

    if (error) {
      this.errorMessage = 'Erro ao entrar: Verifique email e senha.';
    } else {
      // Sucesso! Vai para as tarefas
      this.router.navigate(['/tasks']);
    }
  }

  async onSignUp() {
    this.isLoading = true;
    this.errorMessage = '';

    const { error } = await this.authService.signUp(this.email, this.password);
    
    this.isLoading = false;

    if (error) {
      this.errorMessage = 'Erro ao cadastrar: ' + error.message;
    } else {
      alert('Cadastro realizado com sucesso!');
      this.router.navigate(['/tasks']);
    }
  }
}