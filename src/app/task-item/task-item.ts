// src/app/task-item/task-item.ts

import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService, Task, Category } from '../task';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-item.html',
  styleUrl: './task-item.css'
})
export class TaskItemComponent implements OnInit {
  
  @Input() task!: Task;
  
  // Outputs definidos corretamente
  @Output() remove = new EventEmitter<number>();
  @Output() edit = new EventEmitter<{id: number, newText: string}>();

  public isEditing: boolean = false;
  public editedTaskText: string = '';
  public category: Category | undefined;

  constructor(private taskService: TaskService) {}

  // Carrega a categoria de forma assíncrona
  async ngOnInit(): Promise<void> {
    if (this.task && this.task.categoryId) {
      this.category = await this.taskService.getCategoryById(this.task.categoryId);
    }
  }

  startEdit(): void {
    this.isEditing = true;
    this.editedTaskText = this.task.text;
  }

  saveEdit(): void {
    const newText = this.editedTaskText.trim();
    if (newText && newText !== this.task.text) {
      this.edit.emit({ id: this.task.id, newText: newText });
    }
    this.cancelEdit();
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.editedTaskText = '';
  }

  onRemoveClick(): void {
    this.remove.emit(this.task.id);
  }

  // Método assíncrono para o checkbox
  async onCheckboxChange(): Promise<void> {
    await this.taskService.toggleCompleted(this.task.id, this.task.completed);
  }
}