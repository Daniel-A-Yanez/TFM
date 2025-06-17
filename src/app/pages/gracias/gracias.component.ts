import { Component, OnInit  } from '@angular/core';

@Component({
  selector: 'app-gracias',
  imports: [],
  templateUrl: './gracias.component.html',
  styleUrls: ['./gracias.component.css']
})
export class GraciasComponent implements OnInit {
  nombre: string | null = '';
  programa: string | null = '';

  ngOnInit():void {
      this.nombre = localStorage.getItem('nombre');
      this.programa = localStorage.getItem('programa');
      localStorage.removeItem('nombre');
      localStorage.removeItem('programa');
      console.log('Nombre y programa gracias', this.nombre, this.programa)
    }
  }
