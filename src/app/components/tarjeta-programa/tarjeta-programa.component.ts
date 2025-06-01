import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-tarjeta-programa',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tarjeta-programa.component.html',
  styleUrl: './tarjeta-programa.component.css'
})
export class TarjetaProgramaComponent {
  @Input() programa: any;
}
