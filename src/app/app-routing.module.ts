import { ConfiguracionGuard } from './guardianes/configuracion.guard';
import { AuthGuard } from './guardianes/auth.guard';
import { NoEncontradoComponent } from './componentes/no-encontrado/no-encontrado.component';
import { EditarClienteComponent } from './componentes/editar-cliente/editar-cliente.component';
import { ConfiguracionComponent } from './componentes/configuracion/configuracion.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { LoginComponent } from './componentes/login/login.component';
import { TableroComponent } from './componentes/tablero/tablero.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: TableroComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'registrarse', component: RegistroComponent, canActivate: [ConfiguracionGuard] },
  { path: 'configuracion', component: ConfiguracionComponent, canActivate: [AuthGuard] },
  { path: 'cliente/editar/:id', component: EditarClienteComponent, canActivate: [AuthGuard] },
  { path: '**', component: NoEncontradoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
