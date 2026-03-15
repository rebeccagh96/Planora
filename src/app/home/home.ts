import { Component, Input } from '@angular/core';
import { ListsService } from '../services/lists';
import { ToDoList } from '../../types';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
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

  @Input() todolist!: ToDoList;
}
