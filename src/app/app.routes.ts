import { Routes } from '@angular/router';
import { Header } from './header/header';
import { Footer } from './footer/footer';
import { List } from './list/list';
import { NewList } from './new-list/new-list';
import { Home } from './home/home';
import { AddTodo } from './add-todo/add-todo';
import { UpdateList } from './update-list/update-list';
import { UpdateTodo } from './update-todo/update-todo';
import { Stars } from './stars/stars';

export const routes: Routes = [
    { path: '', component: Home},
    { path: 'header', component: Header },
    { path: 'footer', component: Footer },
    { path: 'list/:id', component: List},
    { path: 'list', component: List },
    { path: 'new-list', component: NewList},
    { path: 'add-todo/:id', component: AddTodo},
    { path: 'update-list/:id', component: UpdateList},
    { path: 'update-todo/:listid/:todoid', component: UpdateTodo},
    { path: 'stars', component: Stars}
];
