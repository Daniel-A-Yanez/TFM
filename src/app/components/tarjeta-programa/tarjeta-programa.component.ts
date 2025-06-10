import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiProgramasService } from '../../Services/api-programas.service';

@Component({
  selector: 'app-tarjeta-programa',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tarjeta-programa.component.html',
  styleUrl: './tarjeta-programa.component.css'
})
export class TarjetaProgramaComponent implements OnInit {
  programas: any[] = [];

  constructor(private apiProgramasService: ApiProgramasService) {}

  ngOnInit(): void {
    this.apiProgramasService.obtenerProgramas().subscribe(data => {
      this.programas = data;
    });
  }
}
