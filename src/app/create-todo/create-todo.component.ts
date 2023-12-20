import { Component } from "@angular/core";
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { TodoService } from "../todo-service";
import { Todo } from "../model/Todo";
import { PriorityComponent } from "../priority/priority.component";
@Component({
  selector: "create-todo",
  standalone: true,
  imports: [ReactiveFormsModule, PriorityComponent],
  templateUrl: "./create-todo.component.html",
  styleUrl: "./create-todo.component.scss",
})
export class CreateTodoComponent {
  constructor(public todo: TodoService) {}
  categories = ["finance", "schule", "house"];
  createTodo = new FormGroup({
    title: new FormControl("", [Validators.required]),
    dueDate: new FormControl(Date.now(), [Validators.required]),
    category: new FormControl(""),
    priorityValue: new FormControl(1, [Validators.required]),
  });

  onSubmit(
    addTodo: FormGroup<{
      title: FormControl<string | null>;
      dueDate: FormControl<number | null>;
      category: FormControl<string | null>;
      priorityValue: FormControl<number | null>;
    }>
  ) {
    let maxValue = 1;
    if (this.todo.allTodo) {
      maxValue = this.todo.allTodo.reduce((a, b) => (a.id > b.id ? a : b)).id;

      maxValue = maxValue + 1;
      this.todo.addTodo(
        new Todo(
          maxValue,
          false,
          addTodo.value.title ?? "",
          addTodo.value.dueDate ?? Date.now(),
          addTodo.value.category ?? "Books",
          addTodo.value.priorityValue ?? 1
        )
      );
    }
  }
}
