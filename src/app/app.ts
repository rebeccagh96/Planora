import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { Footer } from './footer/footer';
import { List } from './list/list';
import { NewList } from './new-list/new-list';
import { Home } from './home/home';
import { AddTodo } from './add-todo/add-todo';
import { UpdateList } from './update-list/update-list';
import { UpdateTodo } from './update-todo/update-todo';
import { Stars } from './stars/stars';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, List, NewList, Home, AddTodo, UpdateList, UpdateTodo, Stars],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Planora');
}
