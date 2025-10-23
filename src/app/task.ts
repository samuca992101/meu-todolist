// src/app/task.service.ts

import { Injectable } from '@angular/core';


interface Task {
  id: number;
  text: string;
  completed: boolean;
}


@Injectable({
  providedIn: 'root' 
})
export class TaskService {

  private tasks: Task[] = [
    { id: 1, text: 'Aprender Angular', completed: true },
    { id: 2, text: 'Fazer o To-Do List', completed: false },
    { id: 3, text: 'Refatorar para Service', completed: false }
  ];
  private nextId: number = 4;

  constructor() { }

 
  
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

 
  updateTask(id: number, newText: string): void {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      const trimmedText = newText.trim();
      if (trimmedText) {
        task.text = trimmedText;
      } else {
        
        this.removeTask(id);
      }
    }
  }

}