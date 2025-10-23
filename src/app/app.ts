// src/app/app.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// (Opcional, mas boa prática) Define a "forma" de um objeto de tarefa
interface Task {
  id: number;
  text: string;
  completed: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule], // Deixe como fizemos no passo 2
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  
  // Variável para armazenar o texto da nova tarefa
  public newTaskText: string = '';

  // Array para armazenar todas as tarefas
  public tasks: Task[] = [
    { id: 1, text: 'Aprender Angular', completed: true },
    { id: 2, text: 'Fazer o To-Do List', completed: false },
    { id: 3, text: 'Dominar o mundo', completed: false }
  ];

  // Variável para gerar IDs únicos
  private nextId: number = 4;

  /**
   * Adiciona uma nova tarefa à lista
   */
  addTask() {
    // Remove espaços em branco do início e fim
    const text = this.newTaskText.trim();

    // Só adiciona se o texto não estiver vazio
    if (text) {
      const newTask: Task = {
        id: this.nextId,
        text: text,
        completed: false
      };

      // Adiciona a nova tarefa ao array
      this.tasks.push(newTask);

      // Incrementa o ID para a próxima tarefa
      this.nextId++;
      
      // Limpa o campo de input
      this.newTaskText = '';
    }
  }

  /**
   * Remove uma tarefa da lista com base no ID
   */
  removeTask(idToRemove: number) {
    // Filtra o array, mantendo apenas as tarefas com ID diferente
    this.tasks = this.tasks.filter(task => task.id !== idToRemove);
  }
}