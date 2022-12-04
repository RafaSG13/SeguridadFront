import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from '../../auth/services/usuarios.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [`
  .container {
    margin: 10px;
  },
  .usuarioLogueado{
    margin-right: 10px;
  }
`]
})
export class HomeComponent implements OnInit {

  constructor(
    private usuarioService : UsuariosService,
    private router : Router
    ) { }

  ngOnInit(): void {
    this.usuarioService.recarga();

  }

  get usuarioLoggedEmail():string{
    if(this.usuarioService.usuarioLogged !== undefined)
      return this.usuarioService.usuarioLogged.email;
    else
      return '';
  }

  get canCreateEntidad() : boolean{
    if(this.usuarioService.usuarioLogged?.rol=="Usuario" || this.usuarioService.usuarioLogged?.rol=="Superadministrador")
      return true;
    else
      return false;
  }

  get canManageUsers() : boolean{
    if(this.usuarioService.usuarioLogged?.rol=="Administrador" || this.usuarioService.usuarioLogged?.rol=="Superadministrador")
      return true;
    else
      return false;
  }

  cerrarSesion(){
    this.usuarioService.usuarioLogged = undefined;
    localStorage.clear();
    this.router.navigate(['/login/login']);
  }
}
