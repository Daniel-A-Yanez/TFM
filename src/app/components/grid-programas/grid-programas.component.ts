import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TarjetaProgramaComponent } from '../tarjeta-programa/tarjeta-programa.component';

@Component({
  selector: 'app-grid-programas',
  standalone: true,
  imports: [CommonModule, TarjetaProgramaComponent],
  templateUrl: './grid-programas.component.html',
  styleUrl: './grid-programas.component.css'
})
export class GridProgramasComponent {
  programas = [
  {nombre: 'Gerencia Tributaria', tipoprograma: 'Diplomado', fechainicio: '2025-06-26', duracion: '114 horas', ceus: '11.4', modalidad: 'Semipresencial', resumen: 'Este diplomado integra conocimientos de marketing digital, experiencia  del cliente, transformación tecnológica y tendencias emergentes,  formando profesionales capaces de diseñar estrategias innovadoras que  aprovechen herramientas digitales, métricas avanzadas y modelos de  negocio disruptivos.', imagen: 'https://www.uv.mx/ceca/wp-content/uploads/sites/102/2024/10/gerencia-tributaria.jpg' }
  ];
  // Puedes agregar más programas aquí siguiendo el mismo formato
}
