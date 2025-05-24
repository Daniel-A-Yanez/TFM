import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeroSliderComponent } from "./hero-slider/hero-slider.component";
import { BloqueProgramaHomeComponent } from "./bloque-programa-home/bloque-programa-home.component";
import { MenuComponent } from "./menu/menu.component";
import { NuestrosProgramasComponent } from "./nuestros-programas/nuestros-programas.component";
import { FooterComponent } from "./footer/footer.component";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeroSliderComponent, BloqueProgramaHomeComponent, MenuComponent, NuestrosProgramasComponent, FooterComponent],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TFM';
}
