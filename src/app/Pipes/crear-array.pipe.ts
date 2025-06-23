import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'crearArray'
})
export class CrearArrayPipe implements PipeTransform {
  transform(cantidad: number): number[] {
    return Array.from({ length: cantidad }, (_, i) => i);
  }
}