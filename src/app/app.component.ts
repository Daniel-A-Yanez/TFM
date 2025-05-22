import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeroSliderComponent } from "./hero-slider/hero-slider.component";
import { BloqueProgramaHomeComponent } from "./bloque-programa-home/bloque-programa-home.component";
import { MenuComponent } from "./menu/menu.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeroSliderComponent, BloqueProgramaHomeComponent,MenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TFM';
}
