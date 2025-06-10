import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiProgramasService } from '../../Services/api-programas.service';

@Component({
  selector: 'app-tarjeta-programa',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tarjeta-programa.component.html',
  styleUrl: './tarjeta-programa.component.css'
})
export class TarjetaProgramaComponent implements OnInit {
 filtros = {
  area: '',
  tipo: '',
  modalidad: ''
};

programas: any[] = [];
programasFiltrados: any[] = [];
areas: string[] = [];
tipos: string[] = [];
modalidades: string[] = [];

constructor(private apiProgramasService: ApiProgramasService) {}

ngOnInit(): void {
  this.apiProgramasService.obtenerProgramas().subscribe(data => {
    this.programas = data;
    this.programasFiltrados = data;

    this.areas = [...new Set(data.map(p => p.area))];
    this.tipos = [...new Set(data.map(p => p.tipoprograma))];
    this.modalidades = [...new Set(data.map(p => p.modalidad))];
  });
}

filtrarProgramas() {
  this.programasFiltrados = this.programas.filter(p => {
    const cumpleArea = this.filtros.area === '' || p.area === this.filtros.area;
    const cumpleTipo = this.filtros.tipo === '' || p.tipoprograma === this.filtros.tipo;
    const cumpleModalidad = this.filtros.modalidad === '' || p.modalidad === this.filtros.modalidad;
    return cumpleArea && cumpleTipo && cumpleModalidad;
  });
}
}
