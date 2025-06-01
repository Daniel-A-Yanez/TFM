import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  constructor(private router: Router) {} 

  irAProgramas() {
    this.router.navigate(['/programas-abiertos']);
  }
  irAInicio() {
    this.router.navigate(['/inicio']);  

}
}