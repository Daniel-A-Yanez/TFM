import { Component } from '@angular/core';
import { MenuComponent } from '../../components/menu/menu.component';
import { HeroSliderComponent } from '../../components/hero-slider/hero-slider.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { BloqueProgramaHomeComponent } from '../../components/bloque-programa-home/bloque-programa-home.component';
import { NuestrosProgramasComponent } from '../../components/nuestros-programas/nuestros-programas.component';
import { AcreditacionesComponent } from '../../components/acreditaciones/acreditaciones.component';


@Component({
  selector: 'app-inicio',
  imports: [MenuComponent, HeroSliderComponent, FooterComponent, BloqueProgramaHomeComponent, NuestrosProgramasComponent, AcreditacionesComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

}