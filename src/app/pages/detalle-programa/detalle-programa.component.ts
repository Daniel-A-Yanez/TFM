import { Component, OnInit, AfterViewInit, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Router  } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CommonModule} from '@angular/common';
import { HeroProgramasComponent } from '../../components/hero-programas/hero-programas.component';
import { ApiProgramasService } from '../../Services/api-programas.service';
import { FormulariocontactoComponent } from '../../components/formulariocontacto/formulariocontacto.component';
import { CarritoService } from '../../Services/carrito.service';

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
    private router: Router,
    private carritoService: CarritoService
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
    this.carritoService.agregarPrograma(this.programa);
    console.log('Programa agregado al carrito con servicio:', this.programa);
    this.router.navigate(['/checkout']);
    }
  }
}
