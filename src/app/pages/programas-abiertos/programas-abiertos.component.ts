import { Component } from '@angular/core';
import { GridProgramasComponent } from "../../components/grid-programas/grid-programas.component";
import { CommonModule } from '@angular/common';
import { TarjetaProgramaComponent } from '../../components/tarjeta-programa/tarjeta-programa.component';

@Component({
  selector: 'app-programas-abiertos',
  imports: [GridProgramasComponent, CommonModule, TarjetaProgramaComponent,],
  standalone: true,
  templateUrl: './programas-abiertos.component.html',
  styleUrl: './programas-abiertos.component.css'
})
export class ProgramasAbiertosComponent {

}
