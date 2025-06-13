import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  imports: [CommonModule],
  selector: 'app-hero-programas',
  templateUrl: './hero-programas.component.html',
  styleUrls: ['./hero-programas.component.css']
})
export class HeroProgramasComponent {
  @Input() programa: any;
}

