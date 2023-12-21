import { Component, OnInit } from "@angular/core";
import { TodoService } from "../todo-service";
import { Todo } from "../model/Todo";
import { DatePipe, AsyncPipe } from "@angular/common";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import { SideBarComponent } from "../side-bar/side-bar.component";
import { PriorityComponent } from "../priority/priority.component";
import { SortingByDonePipe } from "../sorting-by-done.pipe";
@Component({
  selector: "todo-list",
  standalone: true,
  templateUrl: "./todo-list.component.html",
  styleUrl: "./todo-list.component.scss",
  imports: [
    DatePipe,
    AsyncPipe,
    ReactiveFormsModule,
    SideBarComponent,
    PriorityComponent,
    SortingByDonePipe,
  ],
})
export class TodoListComponent implements OnInit {
  currentCategorie = "alle";
  sort!: boolean;
  delete!: boolean;
  todoList: Todo[] = [];
  filter = new FormGroup({
    searchFilterValue: new FormControl(""),
  });
  highlight: boolean = false;
  constructor(public todoService: TodoService) {}
  ngOnInit(): void {
    this.todoList = this.todoService.getTodo();
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
          this.todoList = this.todoService.getTodo();
          this.highlight = false;
        }
      });
    this.todoService.currentSettings.subscribe((settings) => {
      this.sort = settings.sort;
      this.delete = settings.delete;
    });
  }
  searchFilter(item: Todo) {
    if (!item) {
      return ["not found"];
    }
    return [item.categorie, item.task];
  }
  deleteItem(itemId: number) {
    this.todoList = this.todoService.deleteItem(itemId);
  }
  markItDone(itemId: number) {
    this.todoList = this.todoList.map((todo) => {
      if (todo.id == itemId) {
        todo.done = !todo.done;
      }
      this.todoService.allTodo = this.todoList;
      this.todoService.saveTodoList();
      return todo;
    });
  }
  checkValueCategorie(categorie: string) {
    if (categorie == "alle") {
      this.todoList = this.todoService.getTodo();
    } else {
      this.todoList = this.todoService.getTodo().filter((value) => {
        return value.categorie == categorie;
      });
      this.currentCategorie = categorie;
    }
  }
}
