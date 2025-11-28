// src/app/filter-tasks.pipe.ts (ou filter-tasks.ts)

import { Pipe, PipeTransform } from '@angular/core';
// CORREÇÃO: Importe a interface Task do arquivo central
import { Task } from './task'; 

@Pipe({
  name: 'filterTasks',
  standalone: true
})
export class FilterTasksPipe implements PipeTransform {

  transform(tasks: Task[], searchTerm: string): Task[] {
    if (!tasks) {
      return [];
    }
    if (!searchTerm) {
      return tasks; // Se não há busca, retorna todas as tarefas
    }

    searchTerm = searchTerm.toLowerCase();
    
    return tasks.filter(task => {
      return task.text.toLowerCase().includes(searchTerm);
    });
  }
}