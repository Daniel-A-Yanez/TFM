import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestimoniosService } from '../../Services/testimonios.service';

@Component({
  selector: 'app-experiencia',
  imports: [CommonModule],
  templateUrl: './experiencia.component.html',
  styleUrl: './experiencia.component.css'
})
export class ExperienciaComponent implements OnInit {
  testimonios: any[] = [];
  gruposTestimonios: any[][] = [];
  loading: boolean = true;

  constructor(private TestimoniosService: TestimoniosService) {}

  ngOnInit(): void {
    this.TestimoniosService.obtenerTestimonios().subscribe(data => {
      this.testimonios = data;
      this.gruposTestimonios = this.dividirEnGrupos(this.testimonios, 2);
    }
    );
    console.log(this.testimonios);
    };


  dividirEnGrupos(arr: any[], tam: number): any[][] {
    const grupos = [];
    for (let i = 0; i < arr.length; i += tam) {
      grupos.push(arr.slice(i, i + tam));
    }
    return grupos;
  };
}

