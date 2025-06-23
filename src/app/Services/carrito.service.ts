import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private carritoKey = 'carrito';
  private carritoSubject = new BehaviorSubject<any[]>(this.obtenerCarritoDesdeLocalStorage());

  carrito$ = this.carritoSubject.asObservable();

  private obtenerCarritoDesdeLocalStorage(): any[] {
    const carritoGuardado = localStorage.getItem(this.carritoKey);
    if (carritoGuardado) {
      try {
        const carritoParseado = JSON.parse(carritoGuardado);
        if (Array.isArray(carritoParseado)) {
          return carritoParseado.map(item => {
            if (item && item.id) {
              // Si es un programa simple sin estructura { programa, cantidad }
              return { programa: item, cantidad: 1 };
            } else if (item.programa && typeof item.cantidad === 'number') {
              return item;
            } else {
              return null;
            }
          }).filter(Boolean); // Elimina cualquier item inválido
        }
      } catch (e) {
        console.error('Error al parsear el carrito:', e);
      }
    }
    return [];
  }

  private guardarCarritoEnLocalStorage(carrito: any[]) {
    localStorage.setItem(this.carritoKey, JSON.stringify(carrito));
    this.carritoSubject.next(carrito);
  }

  obtenerCarrito(): any[] {
    return this.carritoSubject.getValue();
  }

  agregarPrograma(programa: any) {
    const carrito = this.obtenerCarrito();
    const existente = carrito.find(item => item.programa.id === programa.id);

    if (existente) {
      if (existente.cantidad < 10) {
      existente.cantidad += 1;
    } else {
      alert('No puedes agreagr más de 10 unidades de este programa');
    }
  } else {
      carrito.push({ programa, cantidad: 1 });
    }
      this.guardarCarritoEnLocalStorage(carrito);
  }

  eliminarProgramaPorId(id: string) {
    const carrito = this.obtenerCarrito();
    const index = carrito.findIndex(item => item.programa.id === id);

    if (index > -1) {
      if (carrito[index].cantidad > 1) {
        carrito[index].cantidad -= 1;
      } else {
        carrito.splice(index, 1);
      }
      this.guardarCarritoEnLocalStorage(carrito);
    }
  }

  vaciarCarrito() {
    this.guardarCarritoEnLocalStorage([]);
  }

  obtenerTotal(): number {
    return this.obtenerCarrito().reduce((sum, item) => sum + item.cantidad, 0);
  }
}