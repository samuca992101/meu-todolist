// src/app/app.ts (DEPOIS - LIMPO)

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router'; // 1. Importe o RouterOutlet

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ RouterOutlet ], // 2. Adicione-o aqui
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  // Vazio! A lógica foi movida.
  // Você pode deixar o "title" se quiser, mas ele não é mais usado.
}