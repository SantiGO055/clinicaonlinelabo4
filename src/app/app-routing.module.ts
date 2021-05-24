import { BienvenidoComponent } from './pages/bienvenido/bienvenido.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './componentes/admin/admin.component';
import { AdminGuard } from './guards/admin.guard';
import { AltaTurnoComponent } from './componentes/turnos/alta-turno/alta-turno.component';
import { MiperfilComponent } from './componentes/miperfil/miperfil.component';

const routes: Routes = [
  { path: '', component: BienvenidoComponent},
  { path: 'admin', component: AdminComponent, canActivate:[AdminGuard]},
  { path: 'miperfil', component: MiperfilComponent},
  
  { path: 'solicitarTurno', component: AltaTurnoComponent},
  { path: 'ingreso', loadChildren: () => import('./ingreso/ingreso.module').then(m => m.IngresoModule) },
  { path: 'navbar', loadChildren: () => import('./navbar/navbar.module').then(m => m.NavbarModule) },
  { path: 'spinner', loadChildren: () => import('./componentes/spinner/spinner.module').then(m => m.SpinnerModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
