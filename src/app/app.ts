// src/app/app.ts
import { Component } from '@angular/core';
// 1. Importe RouterLink e RouterLinkActive
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router'; 

@Component({
  selector: 'app-root',
  standalone: true,
  // 2. Adicione-os aos imports
  imports: [ RouterOutlet, RouterLink, RouterLinkActive ], 
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  // Continua vazio
}