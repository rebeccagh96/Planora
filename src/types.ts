export interface ToDo {
    toDoId: number,
    name: string,
    completed: boolean
}

export interface ToDoList {
    toDoListId: number;
    listName: string;
    toDos: ToDo[];
    stars: number;
}
