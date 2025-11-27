import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ToDoList } from '../../types';
import { ListsService } from '../services/lists';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list',
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './list.html',
  styleUrl: './list.css',
})
export class List {
  todolist!: ToDoList;
  todolists: ToDoList[] = [];

  constructor(
    private route: ActivatedRoute,
    private listsService: ListsService,
    private http: HttpClient ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id') as string;
    this.listsService.getList(id.toString()).subscribe(data => {
      console.log(data);
      this.todolist = data
    });
  }

  deleteList(id: number) {
    if (id == null) {
      alert("Något gick fel, hittade inte listan du vill radera!");
    }
    if (id != null) {
      this.http.delete(`https://localhost:7097/api/ToDoList/${id}`)
      .subscribe({
        next: () => {
          alert("Listan raderades!"),
          this.todolists = this.todolists.filter(l => l.toDoListId !== id),
          window.location.href = ""
        },
        error: err => console.error(err)
      });
    }
  }

  toggleCompleted( todo: any) {
    const body = { toDoId: todo.toDoId, name: todo.name, completed: !todo.completed };
    
    if (todo == null) {
      alert("Kan inte ändra status på uppgiften!");
    }
    if (todo != null) {
      this.http.patch(
        `https://localhost:7097/api/ToDoList/ToDo/${body.toDoId}`, body)
        .subscribe({
        next: () => {
          todo.completed = body.completed;
          this.starsCounter();
          this.updateStars(todo.toDoListId, this.todolist);
        },
        error: (err) => console.error(err)
      });
    }
  }

  starsCounter() {
    if (!this.todolist || !this.todolist.toDos) return;
    this.todolist.stars = this.todolist.toDos.filter(t => t.completed).length;
  }

  updateStars(id: number, toDoList: ToDoList) {
    this.http.patch(`https://localhost:7097/api/ToDoList/${id}`, 
      toDoList)
      .subscribe({
        next: () =>
          console.log("Stjärnor uppdaterade!"),
        error: err => console.error(err)
    });
  }
}
