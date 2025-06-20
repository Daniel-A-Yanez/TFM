import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-boton-ir-programa',
  templateUrl: './boton-ir-programa.component.html',
  styleUrls: ['./boton-ir-programa.component.css']
})
export class BotonIrProgramaComponent implements OnInit {
  @Input() programa: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Aquí puedes agregar lógica de inicialización si la necesitas
  }

  irAlPrograma() {
    const slug = this.generarSlug(this.programa.nombre) + '-' + this.programa.id;
    this.router.navigate(['/programa', slug]);
  }

  generarSlug(nombre: string): string {
    return nombre
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '');
  }
}