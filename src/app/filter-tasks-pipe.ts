

import { Pipe, PipeTransform } from '@angular/core';

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
      return tasks; 
    }

    searchTerm = searchTerm.toLowerCase();
    
    return tasks.filter(task => {
      return task.text.toLowerCase().includes(searchTerm);
    });
  }
}