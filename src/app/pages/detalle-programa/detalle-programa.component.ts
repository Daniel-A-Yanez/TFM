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
  const slugId = this.route.snapshot.paramMap.get('slugId');
  if (slugId) {
    const id = slugId.split('-').pop();
    console.log('ID extraído:', id);

    this.api.obtenerProgramas().subscribe(programas => {
      this.programa = programas.find(p => p.id === id);
      console.log('Programa encontrado:', this.programa);
    });
  }
}


ngAfterViewInit(): void {
  // Hacer scroll al inicio
  window.scrollTo({ top: 0, behavior: 'smooth' });


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
      const carritoActual = JSON.parse(localStorage.getItem('carrito') || '[]');
      const yaExiste = carritoActual.some((p: any) => p.id === this.programa.id);
      if (!yaExiste) {
        carritoActual.push(this.programa);
        localStorage.setItem('carrito', JSON.stringify(carritoActual));
        console.log('Programa agregado al carrito:', this.programa);
      } else {
        console.log('El programa ya está en el carrito');
      }
      this.router.navigate(['/checkout']);
    }
  }
}
