import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-cambiar-password',
  templateUrl: './cambiar-password.component.html',
  styles: [
    `
    .error{
      color:red;
      display:block ;
    }
    `
  ]
})
export class CambiarPasswordComponent {

  public usuario = {
    email : localStorage.getItem('usuarioLogged')!,
    dni: "",
    nombre: "",
    apellido: "",
    rol: "",
    password: ""
  }
  public errorPass: boolean = false;
  public pass1 : string = '';
  public pass2 : string= '';

  constructor(
    private usuarioService : UsuariosService,
    private router:Router,
    private snackBar: MatSnackBar,
    public dialog: MatDialog) { }

  cambiar(){
    if( this.pass1.trim().length === 0   || this.pass1.trim().length === 0 ) {
      return;
    }
    if(this.usuarioService.comprobarPass(this.pass1) === false){
      this.errorPass = true;
      return;
    }
    // Crear
    this.usuario.password = this.pass1;
    this.usuarioService.changePass( this.usuario )
      .subscribe(usuario => {
        this.errorPass = false;
        this.mostrarSnakbar('Contraseña Cambiada ');
      })

  }

  mostrarSnakbar( mensaje: string ) {

    this.snackBar.open( mensaje, 'ok!', {
      duration: 2500
    });

  }
}
