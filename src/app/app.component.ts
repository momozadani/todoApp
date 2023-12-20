import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { NavbarComponent } from "./navbar/navbar.component";

@Component({
  selector: "app-root",
  standalone: true,
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
  imports: [
    CommonModule,
    RouterOutlet,
    NavbarComponent,
    RouterLink,
    RouterLinkActive,
  ],
})
export class AppComponent {
  title = "todoApp";
}
