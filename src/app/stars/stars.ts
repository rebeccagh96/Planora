import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ToDoList } from '../../types';
import { ListsService } from '../services/lists';
import { List } from '../list/list';

@Component({
  selector: 'app-stars',
  imports: [CommonModule, RouterLink, List],
  templateUrl: './stars.html',
  styleUrl: './stars.css',
})
export class Stars {
  todolists: ToDoList[] = [];

  constructor(private listsService: ListsService) {}

  fetchLists(){
    this.listsService.getData()
    .subscribe({
      next:(data:ToDoList[]) => {
        this.todolists = data
      }
    });
  }

  ngOnInit() {
    this.fetchLists();
  }

  @Input() todolist!: ToDoList;
}
