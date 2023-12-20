import { Injectable } from "@angular/core";
import { Todo } from "./model/Todo";

@Injectable({
  providedIn: "root",
})
export class TodoService {
  allTodo: Todo[] = [];
  constructor() {
    this.allTodo.push(new Todo(1, false, "something", Date.now(), "house", 1));
    this.allTodo.push(
      new Todo(2, false, "something", Date.now(), "finance", 2)
    );
    this.allTodo.push(new Todo(3, false, "something", Date.now(), "schule", 3));
    this.allTodo.push(
      new Todo(4, false, "something", Date.now(), "finance", 4)
    );
    localStorage.setItem("testObject", JSON.stringify(this.allTodo));
  }

  getTodo(): Todo[] {
    const testObject = localStorage.getItem("testObject");
    if (testObject) {
      return JSON.parse(testObject);
    }
    return this.allTodo;
  }

  addTodo(todo: Todo) {
    this.allTodo.push(todo);
    localStorage.setItem("testObject", JSON.stringify(this.allTodo));
    console.log(this.getTodo());
  }
  deleteItem(itemId: number) {
    const index = this.allTodo.findIndex((index) => index.id == itemId);
    this.allTodo.splice(index, 1);
    localStorage.setItem("testObject", JSON.stringify(this.allTodo));
    return this.allTodo;
  }
  saveSettings(sortValue: boolean, deleteIcon: boolean) {
    localStorage.setItem(
      "setting",
      JSON.stringify({ sort: sortValue, ShowDelete: deleteIcon })
    );
  }
}
