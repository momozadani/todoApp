import { Injectable } from "@angular/core";
import { Todo } from "./model/Todo";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";

interface Setting {
  sort: boolean;
  delete: boolean;
}
@Injectable({
  providedIn: "root",
})
export class TodoService {
  allTodo: Todo[] = [
    new Todo(1, false, "something", Date.now(), "house", 1),
    new Todo(2, false, "something", Date.now(), "finance", 2),
    new Todo(3, false, "something", Date.now(), "schule", 3),
    new Todo(4, false, "something", Date.now(), "finance", 3),
  ];
  sort: boolean = false;
  delete: boolean = false;
  private settingsSource = new BehaviorSubject<{
    sort: boolean;
    delete: boolean;
  }>(this.getSettings());
  currentSettings = this.settingsSource.asObservable();
  constructor() {
    this.allTodo = this.getTodo();
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
  }
  deleteItem(itemId: number) {
    const index = this.allTodo.findIndex((index) => index.id == itemId);
    this.allTodo.splice(index, 1);
    localStorage.setItem("testObject", JSON.stringify(this.allTodo));
    return this.getTodo();
  }
  saveSettings(sortValue: boolean, deleteIcon: boolean) {
    localStorage.setItem(
      "setting",
      JSON.stringify({ sort: sortValue, delete: deleteIcon })
    );
  }
  getSettings(): { sort: boolean; delete: boolean } {
    const testObject = localStorage.getItem("setting");
    if (testObject) {
      let testSetting = JSON.parse(testObject) as Setting;
      this.sort = testSetting.sort;
      this.delete = testSetting.delete;
    }
    return { sort: this.sort, delete: this.delete };
  }

  changeSettings(sortVal: boolean, deleteVal: boolean) {
    this.settingsSource.next({ sort: sortVal, delete: deleteVal });
    localStorage.setItem(
      "setting",
      JSON.stringify({ sort: sortVal, delete: deleteVal })
    );
  }
  saveTodoList() {
    localStorage.setItem("testObject", JSON.stringify(this.allTodo));
  }
}
