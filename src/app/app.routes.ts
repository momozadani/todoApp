import { Routes } from "@angular/router";
import { CreateTodoComponent } from "./create-todo/create-todo.component";
import { SettingComponent } from "./setting/setting.component";
import { TodoListComponent } from "./todo-list/todo-list.component";

export const routes: Routes = [
  { path: "todoList", component: TodoListComponent },
  { path: "createTodo", component: CreateTodoComponent },
  { path: "settings", component: SettingComponent },
  { path: "**", redirectTo: "/todoList", pathMatch: "full" },
];
