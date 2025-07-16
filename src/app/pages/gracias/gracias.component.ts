import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gracias',
  imports: [CommonModule],
  templateUrl: './gracias.component.html',
  styleUrls: ['./gracias.component.css']
})
export class GraciasComponent implements OnInit {
  nombre: string | null = '';
  apellido: string | null = '';
  correo: string | null = '';
  celular: string | null = '';
  programas: string | null = '';
  listaProgramas: any[] = [];
  inscritos: any[] = [];

  ngOnInit():void {
      this.nombre = localStorage.getItem('nombre');
      this.apellido = localStorage.getItem('apellido');
      this.celular = localStorage.getItem('celular');
      this.correo = localStorage.getItem('correo');
      this.programas = localStorage.getItem('programas');
      this.inscritos = localStorage.getItem('inscritos') ? JSON.parse(localStorage.getItem('inscritos')!) : [];
    
      const programasStr = localStorage.getItem('programas');
        if (programasStr) {
        this.listaProgramas = JSON.parse(programasStr);
      }

      console.log('Programas en localStorage:', this.listaProgramas);
      console.log('Inscritos en localStorage:', this.inscritos);
  }

      getArray(cantidad: number): number[] {
        return Array.from({ length: cantidad }, (_, i) => i);
      }
      
            getCampoValor(campo: string): string {
        const encontrado = this.inscritos.find(item => item.campo === campo);
        return encontrado ? encontrado.input : '';
      }

      redirectToHome(): void {
        localStorage.clear();
        this.listaProgramas = [];
        this.inscritos = [];
        this.nombre = '';
        this.apellido = '';
        this.correo = '';
        this.celular = '';
        this.programas = '';
        window.location.href = '/';
      }

}