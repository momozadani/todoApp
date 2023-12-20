import { Component, Input } from "@angular/core";

@Component({
  selector: "priority",
  standalone: true,
  imports: [],
  templateUrl: "./priority.component.html",
  styleUrl: "./priority.component.scss",
})
export class PriorityComponent {
  @Input() pr: number = 1;
}
