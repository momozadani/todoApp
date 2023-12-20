import { Component, OnInit } from "@angular/core";
import { TodoService } from "../todo-service";
import { Todo } from "../model/Todo";
import { DatePipe, AsyncPipe } from "@angular/common";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";

@Component({
  selector: "todo-list",
  standalone: true,
  imports: [DatePipe, AsyncPipe, ReactiveFormsModule],
  templateUrl: "./todo-list.component.html",
  styleUrl: "./todo-list.component.scss",
})
export class TodoListComponent implements OnInit {
  todoList: Todo[] = [];
  filter = new FormGroup({
    searchFilterValue: new FormControl(""),
  });
  highlight: boolean = false;
  constructor(public todo: TodoService) {}
  ngOnInit(): void {
    this.todoList = this.todo.allTodo;
    this.filter
      .get("searchFilterValue")
      ?.valueChanges.pipe(debounceTime(200), distinctUntilChanged())
      .subscribe((value) => {
        if (value) {
          this.todoList = this.todoList.filter((item) => {
            const key = this.searchFilter(item);
            return key.some((result) => {
              return result.toLowerCase().includes(value?.toLowerCase());
            });
          });
          this.highlight = true;
        } else {
          this.todoList = this.todo.allTodo;
          this.highlight = false;
        }
      });
  }
  searchFilter(item: Todo) {
    if (!item) {
      return ["not found"];
    }
    return [item.categorie, item.task];
  }
  deleteItem(itemId: number) {
    const index = this.todoList.findIndex((index) => index.id == itemId);
    this.todoList.splice(index, 1);
  }
  markItDone(itemId: number) {
    this.todoList = this.todoList.map((todo) => {
      if (todo.id == itemId) {
        todo.done = !todo.done;
      }
      return todo;
    });
  }
}
