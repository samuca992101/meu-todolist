// src/app/task.ts

import { Injectable } from '@angular/core';
import { supabase } from './supabase-client'; // Importamos o cliente que você criou

export interface Category {
  id: number;
  name: string;
  color: string;
}

export interface Task {
  id: number;
  text: string;
  completed: boolean;
  categoryId: number;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() { }

  // --- MÉTODOS DE LEITURA (Read) ---

  // Agora retorna uma Promise de um array de Tasks
  async getTasks(): Promise<Task[]> {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('id', { ascending: true }); // Ordena por ID

    if (error) {
      console.error('Erro ao buscar tarefas:', error);
      return [];
    }
    console.log('DADOS VINDOS DO SUPABASE:', data);
    return data as Task[];
  }

  async getCategories(): Promise<Category[]> {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('id', { ascending: true });

    if (error) {
      console.error('Erro ao buscar categorias:', error);
      return [];
    }
    return data as Category[];
  }

  // Busca uma categoria específica (usado no item da tarefa)
  async getCategoryById(id: number): Promise<Category | undefined> {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('id', id)
      .single(); // Traz apenas um item

    if (error) return undefined;
    return data as Category;
  }

  // --- MÉTODOS DE ESCRITA (Create, Update, Delete) ---

  async addTask(text: string, categoryId: number): Promise<void> {
    // Não precisamos gerar ID, o banco faz isso!
    const { error } = await supabase
      .from('tasks')
      .insert({ text, categoryId }); // completed é false por padrão no banco

    if (error) console.error('Erro ao adicionar tarefa:', error);
  }

  async addCategory(name: string, color: string): Promise<void> {
    const { error } = await supabase
      .from('categories')
      .insert({ name, color });

    if (error) console.error('Erro ao adicionar categoria:', error);
  }

  async removeTask(id: number): Promise<void> {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id);

    if (error) console.error('Erro ao remover tarefa:', error);
  }

  async updateTask(id: number, newText: string): Promise<void> {
    const { error } = await supabase
      .from('tasks')
      .update({ text: newText })
      .eq('id', id);

    if (error) console.error('Erro ao atualizar tarefa:', error);
  }

  // NOVO: Precisamos salvar quando o usuário marca o checkbox!
  async toggleCompleted(id: number, completed: boolean): Promise<void> {
    const { error } = await supabase
      .from('tasks')
      .update({ completed: completed })
      .eq('id', id);

    if (error) console.error('Erro ao mudar status:', error);
  }
}