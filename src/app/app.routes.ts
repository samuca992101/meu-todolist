// src/app/app.routes.ts
import { Routes } from '@angular/router';
// 1. Importe seu novo componente
import { TaskListComponent } from './task-list/task-list'; 

export const routes: Routes = [
    // 2. Se o usuário acessar a raiz ('/'), redirecione para '/tasks'
    { 
        path: '', 
        redirectTo: '/tasks', 
        pathMatch: 'full' 
    }, 
    
    // 3. Se o usuário acessar '/tasks', mostre o TaskListComponent
    { 
        path: 'tasks', 
        component: TaskListComponent 
    } 
    
    // (Mais rotas virão aqui depois, ex: /login, /projects)
];