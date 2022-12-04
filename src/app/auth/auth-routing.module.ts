import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListadoUsuariosComponent } from './pages/listado-usuarios/listado-usuarios.component';
import { VerUsuarioComponent } from './pages/ver-usuario/ver-usuario.component';
import { AnadirUsuarioComponent } from './pages/anadir-usuario/anadir-usuario.component';
import { BuscarUsuarioComponent } from './pages/buscar-usuario/buscar-usuario.component';
import { HomeComponent } from '../shared/home/home.component';
import { ModificarUsuarioComponent } from './pages/modificar-usuario/modificar-usuario.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {path: 'listado',component: ListadoUsuariosComponent},
      { path: 'anadir', component: AnadirUsuarioComponent },
      { path: 'modificar/:email', component: ModificarUsuarioComponent },
      { path: 'buscar', component: BuscarUsuarioComponent },
      { path: ':email', component: VerUsuarioComponent },
      {path: '**', redirectTo: ''}
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
