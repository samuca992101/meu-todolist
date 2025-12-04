
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

  @Output() taskAdded = new EventEmitter<{text: string, categoryId: number, imageUrl: string}>();
  public newTaskText: string = '';
  public selectedCategoryId: number = 1;
  public categories: Category[] = [];

  public selectedFile: File | null = null;
  public isCreatingCategory: boolean = false;
  public newCategoryName: string = '';
  public newCategoryColor: string = '#3b82f6';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.refreshCategories();
  }

  async refreshCategories(): Promise<void> {
    this.categories = await this.taskService.getCategories();
  }
  toggleCategoryMode(): void {
    this.isCreatingCategory = !this.isCreatingCategory;
    this.newCategoryName = '';
  }

  async saveCategory(): Promise<void> {
    if (this.newCategoryName.trim()) {
      await this.taskService.addCategory(this.newCategoryName, this.newCategoryColor);
      await this.refreshCategories(); 
      
      const lastCategory = this.categories[this.categories.length - 1];
      this.selectedCategoryId = lastCategory.id;

      this.toggleCategoryMode(); 
    }
  }

  async onSubmit(): Promise<void> { // Agora é async!
  const text = this.newTaskText.trim();
  if (text) {
    
    let imageUrl = '';
    
    // Se tiver arquivo, faz upload primeiro
    if (this.selectedFile) {
      const url = await this.taskService.uploadImage(this.selectedFile);
      if (url) imageUrl = url;
    }

    // Emite o evento com a URL da imagem junto
    this.taskAdded.emit({ 
      text: text, 
      categoryId: Number(this.selectedCategoryId),
      imageUrl: imageUrl // Passa a URL para o pai
    });
    
    this.newTaskText = '';
    this.selectedFile = null; // Limpa o arquivo
  }
}
  onFileSelected(event: any): void {
  const file = event.target.files[0];
  if (file) {
    this.selectedFile = file;
  }
}
}