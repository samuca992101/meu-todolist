
import { Routes } from '@angular/router';

import { TaskListComponent } from './task-list/task-list'; 
import { Home } from './home/home';

export const routes: Routes = [
    { 
        path: '', 
        redirectTo: '/home', 
        pathMatch: 'full' 
    }, 
    {
        path: 'home',
        component: Home
    },
    { 
        path: 'tasks', 
        component: TaskListComponent 
    } 
];