import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-add-todo',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './add-todo.html',
  styleUrl: './add-todo.css',
})
export class AddTodo {
    toDoListId!: number;
    name: string = '';

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit() {
    this.toDoListId = Number(this.route.snapshot.paramMap.get('id'));
    console.log("LIST-ID:", this.toDoListId);
  }

  createToDo() {
    const body = { name: this.name, completed: false, toDoListId: this.toDoListId };
    if (this.name == "") {
      alert("Du kan inte skapa en uppgift utan namn!");
    }
    if (this.name != "") {
      this.http.post('https://localhost:7097/api/ToDoList/' + this.toDoListId, body)
        .subscribe({
        next: () => { alert("Uppgift skapad!"),
          window.location.href = `/list/${this.toDoListId}`
        },
        error: err => console.error(err)
      });
    }
  }
}
