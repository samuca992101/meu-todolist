// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { TaskListComponent } from './task-list/task-list';
import { Home } from './home/home';
import { LoginComponent } from './login/login'; // 1. Importe o Login
import { authGuard } from './auth.guard';       // 2. Importe o Guarda

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: Home },
  
  // 3. Adicione a rota de Login
  { path: 'login', component: LoginComponent },

  // 4. Proteja a rota de Tasks
  { 
    path: 'tasks', 
    component: TaskListComponent,
    canActivate: [authGuard] // <--- AQUI ESTÁ A PROTEÇÃO!
  }
];