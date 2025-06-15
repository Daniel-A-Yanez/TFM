import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { parse } from 'path';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  programasCarrito: any[] = [];
  total: number = 0;

  ngOnInit(): void {
    this.programasCarrito = this.getProgramasFromStorage();
    console.log('Programas en el carrito:', this.programasCarrito);
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
}
