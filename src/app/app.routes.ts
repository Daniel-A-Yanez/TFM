import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ProgramasAbiertosComponent } from './pages/programas-abiertos/programas-abiertos.component';
import { MenuComponent } from './components/menu/menu.component';
import { DetalleProgramaComponent } from './pages/detalle-programa/detalle-programa.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { GraciasComponent } from './pages/gracias/gracias.component';



export const routes: Routes = [
    {path: '', component: InicioComponent},
    {path: 'inicio', component: InicioComponent},
    {path: 'programas-abiertos', component: ProgramasAbiertosComponent},
    {path: 'programa/:slugId', component: DetalleProgramaComponent},
    {path: 'checkout', component: CheckoutComponent},
    {path: 'gracias', component: GraciasComponent}
];
