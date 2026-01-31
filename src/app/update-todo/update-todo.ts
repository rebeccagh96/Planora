import { Component } from '@angular/core';
import { ToDo, ToDoList } from '../../types';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ListsService } from '../services/lists';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-update-todo',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './update-todo.html',
  styleUrl: './update-todo.css',
})
export class UpdateTodo {
  listName: string = '';
  toDoListId!: number;
  todolist!: ToDoList; 
  todos: ToDo[] = [];
  toDoId!: number;
  name: string = '';
  completed!: boolean;

  constructor(
    private route: ActivatedRoute,
    private service: ListsService,
    private http: HttpClient ) {}

  ngOnInit() {
    const listid = this.route.snapshot.params["listid"];
    this.toDoId = Number(this.route.snapshot.params['todoid']);
    this.service.getList(listid).subscribe(list => {
      this.todolist = list;
      this.listName = list.listName;
      this.toDoListId = list.toDoListId;
      this.todos = list.toDos;

      const todo = list.toDos.find(t => t.toDoId === this.toDoId);
      if (todo != null) {
        this.completed = todo.completed;
      }
      if (todo) {
        this.name = todo.name;
      }
    });
  }
  
  updateToDo() {
    const body = { toDoId: this.toDoId, completed: this.completed, name: this.name};
    if (this.name == "") {
      alert("Du kan inte uppdatera till ett tomt namn!");
    }
    if (this.name != "") {
      this.http.patch(`https://localhost:7097/api/ToDoList/ToDo/${this.toDoId}`, body)
        .subscribe({
        next: () => { alert('Uppgiften uppdaterades!'), 
          window.location.href = `/list/${this.toDoListId}`
        },
        error: err => console.error(err)
      });
    }
  }

  deleteToDo(id: number) {
    if (id == null) {
      alert("Något gick fel, hittade inte uppgiften du vill radera!");
      return;
    }

    const result = confirm("Är du säker på att du vill radera denna uppgift?");

    if (!result) {
      return;
    }

    if (id != null) {
      this.http.delete(`https://localhost:7097/api/ToDoList/ToDo/${id}`)
      .subscribe({
        next: () => {
          alert("Uppgiften raderades!"),
          this.todos = this.todos.filter(l => l.toDoId !== id),
          window.location.href = `/list/${this.toDoListId}`
        },
        error: err => console.error(err)
      });
    }
  }
}
