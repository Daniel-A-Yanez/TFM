import { Component, OnInit, AfterViewInit, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Router  } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CommonModule} from '@angular/common';
import { HeroProgramasComponent } from '../../components/hero-programas/hero-programas.component';
import { ApiProgramasService } from '../../Services/api-programas.service';
import { FormulariocontactoComponent } from '../../components/formulariocontacto/formulariocontacto.component';

@Component({
  selector: 'app-detalle-programa',
  standalone: true,
  imports: [CommonModule, HeroProgramasComponent, FormulariocontactoComponent],
  templateUrl: './detalle-programa.component.html',
  styleUrl: './detalle-programa.component.css'
})
export class DetalleProgramaComponent implements OnInit, AfterViewInit {
  programa: any;
  @ViewChild('cronogramaContainer', { static: false }) cronogramaContainer!: ElementRef;

   constructor(
    private route: ActivatedRoute,
    private api: ApiProgramasService,
    private renderer: Renderer2,
    private router: Router
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

ngAfterViewInit(): void {
  setTimeout(() => {
    if (this.cronogramaContainer) {
      const script = this.renderer.createElement('script');
      script.src = 'https://cdn.addevent.com/libs/cal/js/cal.events.embed.t4.init.js';
      script.type = 'text/javascript';
      this.renderer.appendChild(this.cronogramaContainer.nativeElement, script);
    }
  }, 0);
}

  slugify(text: string): string {
    return text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');
  }

  irACheckout(): void {
    if (this.programa) {
      localStorage.setItem('carrito', JSON.stringify([this.programa]));
      this.router.navigate(['/checkout']);
      console.log('Programa agregado al carrito:', this.programa);
    }
  }
}
