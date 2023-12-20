import { Injectable } from "@angular/core";
import { Todo } from "./model/Todo";

@Injectable({
  providedIn: "root",
})
export class TodoService {
  allTodo: Todo[] = [];
  constructor() {
    this.allTodo.push(
      new Todo(1, false, "something", Date.now(), "house", "lowValue")
    );
    this.allTodo.push(
      new Todo(2, false, "something", Date.now(), "finance", "lowValue")
    );
    this.allTodo.push(
      new Todo(3, false, "something", Date.now(), "schule", "highValue")
    );
    this.allTodo.push(
      new Todo(4, false, "something", Date.now(), "verein", "mediumValue")
    );
    localStorage.setItem("testObject", JSON.stringify(this.allTodo));
  }

  getTodo() {
    return localStorage.getItem("testObject");
  }
  addTodo(todo: Todo) {
    this.allTodo.push(todo);
    localStorage.setItem("testObject", JSON.stringify(this.allTodo));
    console.log(this.getTodo());
  }
}
