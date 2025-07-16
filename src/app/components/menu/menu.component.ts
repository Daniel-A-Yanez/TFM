import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CarritoService } from '../../Services/carrito.service';
import { MegaMenuComponent } from '../mega-menu/mega-menu.component'; 

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterModule, MegaMenuComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {
  totalEnCarrito: number = 0;

  constructor(private router: Router, private carritoService: CarritoService) {} 

  seccioninactiva(): void {
    alert('Esta sección aún no está disponible');
    console.log('Sección inactiva');
  }

  ngOnInit(): void {
    this.totalEnCarrito = this.carritoService.obtenerTotal();
    this.carritoService.carrito$.subscribe(carrito => {
    this.totalEnCarrito = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    });
  }

  irAProgramas() {
    this.router.navigate(['/programas-abiertos']);
  }
  irAInicio() {
    this.router.navigate(['/inicio']);  
}
}