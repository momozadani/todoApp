import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "side-bar",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./side-bar.component.html",
  styleUrl: "./side-bar.component.scss",
})
export class SideBarComponent {
  @Input() categorie!: string;
  @Output() categorieChange = new EventEmitter<string>();
  handleList(cat: string) {
    this.categorie = cat;
    this.categorieChange.emit(this.categorie);
  }

  open: boolean = true;
  categories = ["alle", "finance", "schule", "house"];
  toggleList() {
    this.open = !this.open;
    console.log(this.open);
  }
}
