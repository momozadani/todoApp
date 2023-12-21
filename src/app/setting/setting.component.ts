import { Component } from "@angular/core";
import { FormGroup, FormControl, ReactiveFormsModule } from "@angular/forms";
import { TodoService } from "../todo-service";

@Component({
  selector: "app-setting",
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: "./setting.component.html",
  styleUrl: "./setting.component.scss",
})
export class SettingComponent {
  sort: boolean = false;
  delete: boolean = false;
  changeSetting: FormGroup = new FormGroup({
    sort: new FormControl(this.sort),
    delete: new FormControl(this.delete),
  });
  constructor(public todoService: TodoService) {}
  ngOnInit(): void {
    this.todoService.currentSettings.subscribe((settings) => {
      this.sort = settings.sort;
      this.delete = settings.delete;
      this.changeSetting.setValue({
        sort: this.sort,
        delete: this.delete,
      });
    });
  }
  onSubmit(
    setting: FormGroup<{
      sort: FormControl<boolean | null>;
      delete: FormControl<boolean | null>;
    }>
  ) {
    this.todoService.changeSettings(
      setting.value.sort ?? false,
      setting.value.delete ?? false
    );
  }
}
