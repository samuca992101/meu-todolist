// src/app/task-form/task-form.ts
import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService, Category } from '../task';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css'
})
export class TaskFormComponent implements OnInit {

  @Output() taskAdded = new EventEmitter<{text: string, categoryId: number}>();

  public newTaskText: string = '';
  public selectedCategoryId: number = 1;
  public categories: Category[] = [];

  // 1. NOVAS VARIÁVEIS para controlar a criação de categoria
  public isCreatingCategory: boolean = false;
  public newCategoryName: string = '';
  public newCategoryColor: string = '#3b82f6'; // Cor padrão (Azul)

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.refreshCategories();
  }

  async refreshCategories(): Promise<void> {
    this.categories = await this.taskService.getCategories();
  }

  // 2. Método para alternar entre o Dropdown e o Input de Nova Categoria
  toggleCategoryMode(): void {
    this.isCreatingCategory = !this.isCreatingCategory;
    this.newCategoryName = ''; // Limpa o input
  }

  // 3. Método para SALVAR a nova categoria
  async saveCategory(): Promise<void> {
    if (this.newCategoryName.trim()) {
      await this.taskService.addCategory(this.newCategoryName, this.newCategoryColor);
      await this.refreshCategories(); // Atualiza a lista do dropdown
      
      // Seleciona automaticamente a nova categoria criada (a última do array)
      const lastCategory = this.categories[this.categories.length - 1];
      this.selectedCategoryId = lastCategory.id;

      this.toggleCategoryMode(); // Volta para o modo normal
    }
  }

  onSubmit(): void {
    // ... (mesmo código de antes)
    const text = this.newTaskText.trim();
    if (text) {
      this.taskAdded.emit({ 
        text: text, 
        categoryId: Number(this.selectedCategoryId) 
      });
      this.newTaskText = '';
    }
  }
}