import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule} from '@angular/common';
import { HeroProgramasComponent } from '../../components/hero-programas/hero-programas.component';
import { ApiProgramasService } from '../../Services/api-programas.service';

@Component({
  selector: 'app-detalle-programa',
  standalone: true,
  imports: [CommonModule, HeroProgramasComponent],
  templateUrl: './detalle-programa.component.html',
  styleUrl: './detalle-programa.component.css'
})
export class DetalleProgramaComponent implements OnInit {
  programa: any;

   constructor(
    private route: ActivatedRoute,
    private api: ApiProgramasService
  ) {}

ngOnInit(): void {
  const slug = this.route.snapshot.paramMap.get('slug');
  console.log('Slug en URL:', slug);
  this.api.obtenerProgramas().subscribe(programas => {
    console.log('Programas obtenidos:', programas);
    this.programa = programas.find(p => this.slugify(p.nombre) === slug);
    console.log('Programa encontrado:', this.programa);
  });
}

  slugify(text: string): string {
    return text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');
  }
}
