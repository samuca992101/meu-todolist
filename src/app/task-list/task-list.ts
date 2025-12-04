
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';   
import { TaskService, Task } from '../task';          
import { FilterTasksPipe } from '../filter-tasks-pipe'; 
import { TaskFormComponent } from '../task-form/task-form';
import { TaskItemComponent } from '../task-item/task-item';

import { AuthService } from '../auth';

@Component({
  selector: 'app-task-list', 
  standalone: true,
  imports: [ CommonModule, FormsModule, FilterTasksPipe, TaskFormComponent, TaskItemComponent], 
  templateUrl: './task-list.html',      
  styleUrl: './task-list.css',
})
export class TaskListComponent implements OnInit {

  public tasks: Task[] = [];
  public searchTerm: string = '';

  constructor(
    private taskService: TaskService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  async loadTasks(): Promise<void> {
    this.tasks = await this.taskService.getTasks();
  }

  async addTask(eventData: { text: string, categoryId: number, imageUrl: string }): Promise<void> {
    await this.taskService.addTask(eventData.text, eventData.categoryId, eventData.imageUrl);
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

  async onLogout(): Promise<void> {
    await this.authService.signOut();
  }
}