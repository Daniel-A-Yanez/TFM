import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiProgramasService {

  private http = inject(HttpClient);

  obtenerProgramas(): Observable<any[]> {
    return this.http.get<any[]>('https://mock.apidog.com/m1/944912-928334-default/programas');
  }
}
