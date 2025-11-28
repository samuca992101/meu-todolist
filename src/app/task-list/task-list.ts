// src/app/task-list/task-list.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';   
// CORREÇÃO AQUI: Adicione ', Task' dentro das chaves
import { TaskService, Task } from '../task';          
import { FilterTasksPipe } from '../filter-tasks-pipe'; // Verifique se o nome do arquivo é esse mesmo
import { TaskFormComponent } from '../task-form/task-form';
import { TaskItemComponent } from '../task-item/task-item';

@Component({
  selector: 'app-task-list', 
  standalone: true,
  imports: [ CommonModule, FormsModule, FilterTasksPipe, TaskFormComponent, TaskItemComponent], 
  templateUrl: './task-list.html',      
  styleUrl: './task-list.css',
          
})
export class TaskListComponent implements OnInit {

  public tasks: Task[] = []; // Agora ele saberá o que é 'Task'
  public searchTerm: string = '';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  async loadTasks(): Promise<void> {
    this.tasks = await this.taskService.getTasks();
  }

  async addTask(eventData: { text: string, categoryId: number }): Promise<void> {
    // Passa os dois dados para o serviço
    await this.taskService.addTask(eventData.text, eventData.categoryId);
    this.loadTasks();
  }

  async removeTask(idToRemove: number): Promise<void> {
    await this.taskService.removeTask(idToRemove);
    this.loadTasks();
  }
  
  async handleEdit(editData: {id: number, newText: string}): Promise<void> {
    await this.taskService.updateTask(editData.id, editData.newText);
    this.loadTasks();
  }
}