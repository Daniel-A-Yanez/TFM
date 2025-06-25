import { Component } from '@angular/core';
import { GridProgramasComponent } from "../../components/grid-programas/grid-programas.component";
import { CommonModule } from '@angular/common';
import { TarjetaProgramaComponent } from '../../components/tarjeta-programa/tarjeta-programa.component';
import { HeroPaginasComponent } from '../../components/hero-paginas/hero-paginas.component';
import { AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-programas-abiertos',
  imports: [GridProgramasComponent, CommonModule, TarjetaProgramaComponent, HeroPaginasComponent,],
  standalone: true,
  templateUrl: './programas-abiertos.component.html',
  styleUrl: './programas-abiertos.component.css'
})
export class ProgramasAbiertosComponent implements AfterViewInit {

  ngAfterViewInit(): void {
  // Hacer scroll al inicio
  window.scrollTo({ top: 0, behavior: 'smooth' });

}
}
