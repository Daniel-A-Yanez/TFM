import { Component, OnInit, ɵsetAlternateWeakRefImpl } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { parse } from 'path';
import { ListapaisesService } from '../../Services/listapaises.service';
import { FormsModule } from '@angular/forms';
import { ApiDescuentosService } from '../../Services/api-descuentos.service';
import { RouterModule } from '@angular/router';
import { CarritoService } from '../../Services/carrito.service';
import { CrearArrayPipe } from '../../Pipes/crear-array.pipe';


@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, CrearArrayPipe],
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
  totalEnCarrito: number = 0;
  

  constructor(private router: Router, 
    private ListapaisesService: ListapaisesService, 
    private ApiDescuentosService: ApiDescuentosService,
    private carritoService: CarritoService) {}


  ngOnInit(): void {
    this.carritoService.carrito$.subscribe(carrito => {
      this.programasCarrito = carrito;
      this.total = this.getTotal();
      this.subtotal = this.total;
      this.aplicarDescuentoDesdeStorage();
      this.totalEnCarrito = this.carritoService.obtenerTotal();
    });
    this.paises = this.ListapaisesService.obtenerPaises();
    
    this.ApiDescuentosService.obtenerDecuentos().subscribe((data) => {
    this.descuentos = data;
    console.log('Descuentos obtenidos:', this.descuentos);
      });

    console.log('Paises:', this.paises);
    console.log('Programas en carrito:', this.programasCarrito);
    console.log(`Total: ${this.total} Subtotal: ${this.subtotal}`)
  }

  getProgramasFromStorage(): any[] {
    const stored = localStorage.getItem('carrito');
    return stored ? JSON.parse(stored) : [];
  }

  getDescuentoFromStorage(): any[] {
    const descuentostorage = sessionStorage.getItem('descuentoingresado'); 
    return descuentostorage ? JSON.parse(descuentostorage): [];
  }

  getTotal(): number {
    return this.programasCarrito.reduce((sum, programa) => {
      const costo = parseFloat(programa.programa?.costo?.toString().replace(/\./g, '')) || 0;
      return sum + (costo * (programa.cantidad || 1));
    }, 0);
  }

  generarSlug(nombre: string): string {
    return nombre
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '');
  }

  
// Función para aplicar descuentos //

//Aplica un descuento guardado al regresar al carrito

aplicarDescuentoDesdeStorage() {
  const objetostorage = Object.keys(this.descuentocarrito).length;

  //si hay un item en el carrito y hay descuento en memoria pero no está aplicado, calcula el descuento

  if (objetostorage > 0 && !this.descuentoYaAplicado) {
    this.descuentoYaAplicado = true;
    const descuentoAplicado = this.total * (this.descuentocarrito.descuento / 100);
    this.totaldescuento = descuentoAplicado;
    this.total -= descuentoAplicado;
    return;
  }

  // si hay un item en el carrito y el descuento ya está aplicado, calcula otra vez el descuento

  if (objetostorage > 0 && this.descuentoYaAplicado) {
    const descuentoAplicado = this.total * (this.descuentocarrito.descuento / 100);
    this.totaldescuento = descuentoAplicado;
    this.total -= descuentoAplicado;
  }

  //Si el carrito está vacío eliminia todos los descuentos

  if (this.programasCarrito.length === 0 && this.descuentoYaAplicado) {
    this.eliminardescuento();
  }
}


// Aplica el descuento al presionar el botón

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
    this.carritoService.eliminarProgramaPorId(id);
  }

  agregarPrograma(programa: any): void {
    this.carritoService.agregarPrograma(programa);
  }

  //Vertifica que los campos estén completos y realiza el pago

  realizarPago() {

    const camposRequeridos = [
      'nombre', 'Apellido', 'celular', 'email', 'Direccion', 'estado', 'zip', 'Tarjeta'
    ];

    const programasencarrito = this.programasCarrito;
    programasencarrito.forEach(programa => {
      for (let i = 0; i < programa.cantidad; i++) {
        const id = programa.programa?.id;
        camposRequeridos.push(`nombre_pax_${id}_${i}`);
        camposRequeridos.push(`apellido_pax_${id}_${i}`);
        camposRequeridos.push(`cargo_pax_${id}_${i}`);
        camposRequeridos.push(`empresa_pax_${id}_${i}`);
        camposRequeridos.push(`celular_pax_${id}_${i}`);
        camposRequeridos.push(`correo_pax_${id}_${i}`);
      }
    });
    console.log('Campos requeridos:', camposRequeridos);

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

    this.carritoService.vaciarCarrito();
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