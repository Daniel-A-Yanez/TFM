import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { parse } from 'node:path';


@Component({
  imports: [CommonModule],
  selector: 'app-hero-programas',
  templateUrl: './hero-programas.component.html',
  styleUrls: ['./hero-programas.component.css']
})
export class HeroProgramasComponent {
  @Input() programa: any;

  get costoConDescuento(): number {
    const costo = parseFloat(this.programa?.costo?.replace('.', '')) || 0;
    return costo * 0.8; // Aplicar un 20% de descuento
  }
}

