import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ProgramasAbiertosComponent } from './pages/programas-abiertos/programas-abiertos.component';


export const routes: Routes = [
    {path: '', component: InicioComponent},
    {path: 'inicio', component: InicioComponent},
    {path: 'programas-abiertos', component: ProgramasAbiertosComponent},
];
