import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { ListadoUsuariosComponent } from './pages/listado-usuarios/listado-usuarios.component';
import { VerUsuarioComponent } from './pages/ver-usuario/ver-usuario.component';
import { AnadirUsuarioComponent } from './pages/anadir-usuario/anadir-usuario.component';
import { BuscarUsuarioComponent } from './pages/buscar-usuario/buscar-usuario.component';
import { HomeComponent } from '../shared/home/home.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {path: 'login',component: LoginComponent},
      {path: 'registro',component: RegistroComponent},
      {path: 'listado',component: ListadoUsuariosComponent},
      { path: 'anadir', component: AnadirUsuarioComponent },
      { path: 'modificar/:email', component: AnadirUsuarioComponent },
      { path: 'buscar', component: BuscarUsuarioComponent },
      { path: ':email', component: VerUsuarioComponent },
      {path: '**', redirectTo: 'login'}
    ]
  }
]


@NgModule({
  imports: [
    RouterModule.forChild( routes )
  ],
  exports: [
    RouterModule
  ]
})
export class AuthRoutingModule { }
