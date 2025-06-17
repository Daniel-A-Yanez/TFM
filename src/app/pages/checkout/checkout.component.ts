import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { parse } from 'path';
import { ListapaisesService } from '../../Services/listapaises.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  paises: any[] = [];
  programasCarrito: any[] = [];
  total: number = 0;

  constructor(private router: Router, private ListapaisesService: ListapaisesService) {}


  ngOnInit(): void {
    this.programasCarrito = this.getProgramasFromStorage();
    this.paises = this.ListapaisesService.obtenerPaises();
    console.log('Programas en el carrito:', this.programasCarrito);
    console.log('Paises:', this.paises)
    this.total = this.getTotal();
  }

  getProgramasFromStorage(): any[] {
    const stored = localStorage.getItem('carrito');
    return stored ? JSON.parse(stored) : [];
  }

  getTotal(): number {
    const total = this.programasCarrito.reduce((sum, programa) => {
      const costo = parseFloat(programa.costo?.toString().replace('.', '')) || 0;
      return sum + costo;
    }, 0);
    console.log('Total calculado:', total);
    return total;
  }

  realizarPago() {
    if (this.programasCarrito.length === 0) {
      alert('Tu carrito está vacio');
      return;
    }
    alert('Gracias por tu compra');
    const nombre = (document.querySelector('input[aria-label="nombre"]') as HTMLInputElement)?.value || '';
    const programa = this.programasCarrito[0]?.nombre || '';

    localStorage.setItem('nombre', nombre);
    localStorage.setItem('programa', programa);

    localStorage.removeItem('carrito');
    this.programasCarrito = [];
    this.total = 0;

    this.router.navigate(['/gracias']);
    console.log('nombre y programa checkout', nombre, programa)
  }


  verificarTarjeta() {
    const numeroTarjeta = (document.querySelector('input[aria-label="Tarjeta"]') as HTMLInputElement)?.value.trim ();
      if (!numeroTarjeta) {
        alert('Por favor ingresar un número de tarjeta');
        return;
      }

    fetch('http://127.0.0.1:3658/m1/944912-928334-default/verificartarjeta', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ numeroTarjeta })
    })
    .then(response => response.json())
    .then(data => {
      if (data.valida) {
        alert('La tarjeta es válida.');
        this.realizarPago();
      } else {
        alert('La tarjeta no es válida.');
      }
    })
    .catch(error => {
      alert('Error al verificar la tarjeta.');
      console.error(error);
    });
  }
}

