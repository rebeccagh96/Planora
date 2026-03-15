import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ToDoList } from '../../types';
import { ListsService } from '../services/lists';

@Component({
  selector: 'app-stars',
  imports: [CommonModule, RouterLink],
  templateUrl: './stars.html',
  styleUrl: './stars.css',
})
export class Stars {
  todolists: ToDoList[] = [];

  constructor(private listsService: ListsService) {}

  fetchLists() {
    this.listsService.getData().subscribe({
      next: (data: ToDoList[]) => {
        this.todolists = data;
      },
    });
  }

  ngOnInit() {
    this.fetchLists();
  }

  getTotalCollectedStars(): number {
    let total = 0;
    for (const list of this.todolists) {
      total += list.stars || 0;
    }
    return total;
  }

  @Input() todolist!: ToDoList;
}
