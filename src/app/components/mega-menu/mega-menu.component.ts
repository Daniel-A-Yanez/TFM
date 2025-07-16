import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-mega-menu',
  imports: [CommonModule, RouterModule],
  templateUrl: './mega-menu.component.html',
  styleUrl: './mega-menu.component.css'
})
export class MegaMenuComponent {
  
  mostrarMenu = false;

  seccioninactiva(): void {
    alert('Esta sección aún no está disponible');
    console.log('Sección inactiva');
  }

}
