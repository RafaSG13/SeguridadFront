import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { AuthRoutingModule } from './auth-routing.module';
import { ListadoUsuariosComponent } from './pages/listado-usuarios/listado-usuarios.component';
import { CartaUsuarioComponent } from './components/carta-usuario/carta-usuario.component';
import { MaterialModule } from '../material/material.module';
import { ConfirmarComponent } from './components/confirmar/confirmar.component';
import { VerUsuarioComponent } from './pages/ver-usuario/ver-usuario.component';
import { AnadirUsuarioComponent } from './pages/anadir-usuario/anadir-usuario.component';
import { BuscarUsuarioComponent } from './pages/buscar-usuario/buscar-usuario.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    LoginComponent,
    RegistroComponent,
    ListadoUsuariosComponent,
    CartaUsuarioComponent,
    ConfirmarComponent,
    VerUsuarioComponent,
    AnadirUsuarioComponent,
    BuscarUsuarioComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialModule,
    FormsModule
  ]
})
export class AuthModule { }
