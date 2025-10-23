// src/app/task-list/task-list.ts (NOVO)

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // 1. Precisa importar aqui
import { FormsModule } from '@angular/forms';   // 2. Precisa importar aqui
import { TaskService } from '../task';           // 3. Importe o serviço (o caminho mudou para '../task')
import { FilterTasksPipe } from '../filter-tasks-pipe';
// 4. Defina a interface Task aqui
interface Task {
  id: number;
  text: string;
  completed: boolean;
}

@Component({
  selector: 'app-task-list', // O selector é diferente
  standalone: true,
  imports: [ CommonModule, FormsModule,FilterTasksPipe ], // 5. Adicione os imports aqui
  templateUrl: './task-list.html',      // Aponta para seu próprio HTML
  styleUrl: './task-list.css'        // Aponta para seu próprio CSS
})
export class TaskListComponent implements OnInit {

  // ----- TODO O CÓDIGO DO TO-DO LIST VEM PRA CÁ -----
  public tasks: Task[] = []; 
  public newTaskText: string = '';
  public editingTaskId: number | null = null;
  public editedTaskText: string = '';
  public searchTerm: string = '';
  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.tasks = this.taskService.getTasks();
  }

  addTask(): void {
    this.taskService.addTask(this.newTaskText);
    this.newTaskText = '';
    this.loadTasks(); 
  }

  removeTask(idToRemove: number): void {
    this.taskService.removeTask(idToRemove);
    this.loadTasks();
  }

  startEdit(task: Task): void {
    this.editingTaskId = task.id;
    this.editedTaskText = task.text;
  }

  saveEdit(task: Task): void {
    if (!this.editingTaskId) return;
    this.taskService.updateTask(this.editingTaskId, this.editedTaskText);
    this.cancelEdit();
    this.loadTasks();
  }

  cancelEdit(): void {
    this.editingTaskId = null;
    this.editedTaskText = '';
  }
  // ----- FIM DO CÓDIGO MOVIDO -----
}