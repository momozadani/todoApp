import { Component } from "@angular/core";
import { FormGroup, FormControl, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: "app-setting",
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: "./setting.component.html",
  styleUrl: "./setting.component.scss",
})
export class SettingComponent {
  onSubmit(
    setting: FormGroup<{
      sort: FormControl<string | null>;
      delete: FormControl<string | null>;
    }>
  ) {
    console.log(setting.value);
  }
  changeSetting = new FormGroup({
    sort: new FormControl(""),
    delete: new FormControl(""),
  });
}
