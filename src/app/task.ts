// src/app/task.service.ts

import { Injectable } from '@angular/core';

// 1. Movemos a interface para cá
interface Task {
  id: number;
  text: string;
  completed: boolean;
}

// 2. @Injectable() marca esta classe como um serviço
@Injectable({
  providedIn: 'root' // 'root' faz com que o Angular o forneça para toda a app
})
export class TaskService {

  // 3. Toda a lógica de dados agora vive dentro do serviço
  private tasks: Task[] = [
    { id: 1, text: 'Aprender Angular', completed: true },
    { id: 2, text: 'Fazer o To-Do List', completed: false },
    { id: 3, text: 'Refatorar para Service', completed: false }
  ];
  private nextId: number = 4;

  constructor() { }

  // 4. Funções públicas que o componente poderá chamar
  
  getTasks(): Task[] {
    return this.tasks;
  }

  addTask(text: string): void {
    const trimmedText = text.trim();
    if (trimmedText) {
      const newTask: Task = {
        id: this.nextId,
        text: trimmedText,
        completed: false
      };
      this.tasks.push(newTask);
      this.nextId++;
    }
  }

  removeTask(idToRemove: number): void {
    this.tasks = this.tasks.filter(task => task.id !== idToRemove);
  }

  // 5. A lógica de edição também vem para cá
  updateTask(id: number, newText: string): void {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      const trimmedText = newText.trim();
      if (trimmedText) {
        task.text = trimmedText;
      } else {
        // Se o texto for salvo como vazio, removemos a tarefa
        this.removeTask(id);
      }
    }
  }

  // A lógica de "completed" é simples, podemos deixar o ngModel lidar com ela
  // Mas se fosse complexa, traríamos para cá também.
}