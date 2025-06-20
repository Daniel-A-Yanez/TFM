import { Component, OnInit, ɵsetAlternateWeakRefImpl } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { parse } from 'path';
import { ListapaisesService } from '../../Services/listapaises.service';
import { FormsModule } from '@angular/forms';
import { ApiDescuentosService } from '../../Services/api-descuentos.service';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  paises: any[] = [];
  programasCarrito: any[] = [];
  total: number = 0;
  subtotal: number = 0;
  descuentos: any[] = [];
  descuentoYaAplicado: boolean = false;
  totaldescuento: number = 0;
  descuentocarrito: any = {};

  constructor(private router: Router, 
    private ListapaisesService: ListapaisesService, 
    private ApiDescuentosService: ApiDescuentosService) {}


  ngOnInit(): void {
    this.programasCarrito = this.getProgramasFromStorage();
    this.paises = this.ListapaisesService.obtenerPaises();
    
    this.ApiDescuentosService.obtenerDecuentos().subscribe((data) => {
    this.descuentos = data;
    console.log('Descuentos obtenidos:', this.descuentos);
      });

    console.log('Programas en el carrito:', this.programasCarrito);
    console.log('Paises:', this.paises);

    this.total = this.getTotal();
    this.subtotal = this.total;
    //this.totaldescuento = this.getTotalDescuentoFromStorage();
    this.descuentocarrito = this.getDescuentoFromStorage();
    console.log ('Descuento en carrito:', this.descuentocarrito);
    this.aplicarDescuentoDesdeStorage();
  }

  getProgramasFromStorage(): any[] {
    const stored = localStorage.getItem('carrito');
    return stored ? JSON.parse(stored) : [];
  }

  getDescuentoFromStorage(): any[] {
    const descuentostorage = sessionStorage.getItem('descuentoingresado'); 
    return descuentostorage ? JSON.parse(descuentostorage): [];
  }

  //getTotalDescuentoFromStorage() {
  //  const descuento = sessionStorage.getItem('descuentousado');
  //  if (descuento !== null && !isNaN(parseFloat(descuento))) {
  //    const descuentonum = parseFloat(descuento);
  //    console.log ('Descuento en storage:', descuentonum );
  //    this.descuentoYaAplicado = true;
  //    return descuentonum;
  //  }
    
  //  if (descuento === null) {
  //  console.log ('No hay descuento guardado en storage');
  //  return 0;
  //  }

  //  return 0;
 // }

  getTotal(): number {
    const total = this.programasCarrito.reduce((sum, programa) => {
      const costo = parseFloat(programa.costo?.toString().replace('.', '')) || 0;
      return sum + costo;
    }, 0);
    console.log('Total calculado:', total);
    return total;
  }
  
// Función para aplicar descuentos //

aplicarDescuentoDesdeStorage() {
  const objetostorage = Object.keys(this.descuentocarrito).length;

  if (objetostorage > 0 && !this.descuentoYaAplicado) {
    this.descuentoYaAplicado = true;
    const descuentoAplicado = this.total * (this.descuentocarrito.descuento / 100);
    this.totaldescuento = descuentoAplicado;
    this.total -= descuentoAplicado;
    return;
  }
}

aplicardescuento() {
  if (this.descuentoYaAplicado) {
    alert('Ya aplicaste un descuento.');
    return;
  }

  const codigodescuento = (document.querySelector('input[aria-label="Descuento"]') as HTMLInputElement)?.value.trim();
  if (!codigodescuento) {
    alert('Por favor ingresar un código de descuento');
    return;
  }

  const descuentoValido = this.descuentos.find(desc => desc.codigo === codigodescuento);
  if (!descuentoValido) {
    alert('Código de descuento no válido');
    return;
  }

  const descuentoAplicado = this.total * (descuentoValido.descuento / 100);
  this.totaldescuento = descuentoAplicado;
  this.total -= descuentoAplicado;
  this.descuentoYaAplicado = true;

  this.descuentocarrito = descuentoValido;
  sessionStorage.setItem('descuentousado', descuentoAplicado.toString());
  sessionStorage.setItem('descuentoingresado', JSON.stringify(descuentoValido));

  alert(`${descuentoValido.descripcion} aplicado`);
}

  // Termina función para aplicar descuentos //


  eliminardescuento() {
    if (this.descuentoYaAplicado) {
      this.descuentoYaAplicado = false;
      this.total = this.subtotal;
      alert(`El descuento ${this.descuentocarrito.codigo} ha sido eliminado`);
      this.descuentocarrito = [];
      sessionStorage.removeItem('descuentoingresado');
    }

  }


  // Eliminar programas del carrito //
 

  eliminarPrograma(id: string): void {
    this.programasCarrito = this.programasCarrito.filter(p => p.id !== id);
    localStorage.setItem('carrito', JSON.stringify(this.programasCarrito));
    this.total = this.getTotal();
  }


  realizarPago() {

    const camposRequeridos = [
      'nombre', 'Apellido', 'celular', 'email', 'Direccion', 'estado', 'zip', 'Tarjeta'
    ];

    const programasencarrito = this.programasCarrito;
    programasencarrito.forEach(programa => {
      camposRequeridos.push('nombre_pax_' + programa.id);
      camposRequeridos.push('apellido_pax_' + programa.id);
      camposRequeridos.push('cargo_pax_' + programa.id);
      camposRequeridos.push('empresa_pax_' + programa.id);
      camposRequeridos.push('celular_pax_' + programa.id);
      camposRequeridos.push('correo_pax_' + programa.id);
    });  

    let hayCamposVacios = false;

    for (const campo of camposRequeridos) {
      const input = document.querySelector(`input[aria-label="${campo}"]`) as HTMLInputElement;
      if (!input || !input.value.trim()) {
        input?.classList.add('itemsinllenar');
        hayCamposVacios = true;
      } else {
        input.classList.remove('itemsinllenar');
      }
    }

    const pais = (document.getElementById('pais-select') as HTMLSelectElement)?.value;
    

   const paisSelect = document.getElementById('pais-select');

    if (!pais || pais === '') {
    paisSelect?.classList.add('itemsinllenar');
    alert('Por favor selecciona un país.');
    hayCamposVacios = true;
    }
    else {
    paisSelect?.classList.remove('itemsinllenar');
    }

    if (hayCamposVacios) {
      alert('Por favor completa los campos en rojo');
      return;
    }


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

  //vertifica tarjeta de crédito con el API

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
        this.verificarEmail();
      } else {
        alert('La tarjeta no es válida.');
      }
    })
    .catch(error => {
      alert('Error al verificar la tarjeta.');
      console.error(error);
    });
  }

  verificarEmail() {
    alert ('Vamos a verificar el correo')
    const emailInput = document.querySelector('input[aria-label="email"]') as HTMLInputElement;
    const email = emailInput?.value.trim();

    // Expresión regular simple para validar correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
    alert('Por favor ingresa un correo electrónico válido.');
    return;
    }

    this.realizarPago();

  }

}

