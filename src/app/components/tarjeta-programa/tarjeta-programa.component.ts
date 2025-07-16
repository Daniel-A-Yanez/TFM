import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApiProgramasService } from '../../Services/api-programas.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tarjeta-programa',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
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

constructor(private apiProgramasService: ApiProgramasService, private route: ActivatedRoute) {}

ngOnInit(): void {
    this.apiProgramasService.obtenerProgramas().subscribe(data => {
    this.programas = data;
    this.programasFiltrados = data;

    this.areas = [...new Set(data.map(p => p.area))];
    this.tipos = [...new Set(data.map(p => p.tipoprograma))];
    this.modalidades = [...new Set(data.map(p => p.modalidad))];
  });

    this.route.queryParams.subscribe(params => {
    const tipo = params['tipo'];
    if (tipo) {
      this.filtros.tipo = tipo;
      this.filtrarProgramas();
    }
  });

    this.route.queryParams.subscribe(params => {
    const area = params['area'];
    if (area) {
      this.filtros.area = area;
      this.filtrarProgramas();
    }
  });

    this.route.queryParams.subscribe(params => {
    const modalidad = params['modalidad'];
    if (modalidad) {
      this.filtros.modalidad = modalidad;
      this.filtrarProgramas();
    }
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

generarSlug(nombre: string): string {
  return nombre
    .toLowerCase()
    .normalize("NFD") // elimina acentos
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '');
}

}
