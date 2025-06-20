import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiProgramasService } from '../../Services/api-programas.service';
import { BotonIrProgramaComponent } from "../boton-ir-programa/boton-ir-programa.component";

@Component({
  selector: 'app-bloque-programa-home',
  standalone: true, 
  imports: [CommonModule, BotonIrProgramaComponent],
  templateUrl: './bloque-programa-home.component.html',
  styleUrl: './bloque-programa-home.component.css'
})
export class BloqueProgramaHomeComponent implements OnInit {
  programas: any[] = [];
  loading: boolean = true;

  constructor(private ApiProgramasService: ApiProgramasService) {}

 ngOnInit(): void {
    this.ApiProgramasService.obtenerProgramas().subscribe(data => {
      this.programas = data.sort((a: any, b: any) => {
        return new Date(a.fechainicio).getTime() - new Date(b.fechainicio).getTime();
      });
    });
  }
    dividirEnGrupos(lista: any[], tamano: number): any[][] {
    const resultado = [];
    for (let i = 0; i < lista.length; i += tamano) {
      resultado.push(lista.slice(i, i + tamano));
    }
    return resultado;
  }


}

