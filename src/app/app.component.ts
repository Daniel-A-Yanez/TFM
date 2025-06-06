import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BloqueProgramaHomeComponent } from "./components/bloque-programa-home/bloque-programa-home.component";
import { MenuComponent } from "./components/menu/menu.component";
import { NuestrosProgramasComponent } from "./components/nuestros-programas/nuestros-programas.component";
import { FooterComponent } from "./components/footer/footer.component";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BloqueProgramaHomeComponent, MenuComponent, NuestrosProgramasComponent, FooterComponent],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TFM';
}
