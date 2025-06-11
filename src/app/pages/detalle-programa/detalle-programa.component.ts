import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule} from '@angular/common';
import { ApiProgramasService } from '../../Services/api-programas.service';

@Component({
  selector: 'app-detalle-programa',
  standalone: true,
  imports: [CommonModule],
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
    this.api.obtenerProgramas().subscribe(programas => {
      this.programa = programas.find(p => this.slugify(p.nombre) === slug);
    });
  }

  slugify(text: string): string {
    return text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');
  }
}
