import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiDescuentosService {

  private http = inject(HttpClient);

  obtenerDecuentos(): Observable<any[]> {
    return this.http.get<any[]>('http://127.0.0.1:3658/m1/944912-928334-default/Descuentos');
  }
}