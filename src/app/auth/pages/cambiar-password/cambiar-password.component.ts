import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';
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
export class CambiarPasswordComponent implements OnInit {

  usuario = {
    email : "",
    dni: "",
    nombre: "",
    apellido: "",
    rol: "",
    password: ""
  }
  errorPass: boolean = false;
  pass1 : string = '';
  pass2 : string= '';

  constructor(
    private usuarioService : UsuariosService,
    private router:Router,
    private snackBar: MatSnackBar,
    public dialog: MatDialog) { }

  ngOnInit(): void {

  }

  cambiar(){
    if( this.pass1.trim().length === 0   || this.pass1.trim().length === 0 ) {
      return;
    }
    if(this.usuarioService.comprobarPass(this.pass1) === false){
      this.errorPass = true;
      return;
    }
    // Crear
    this.usuario.email != localStorage.getItem('usuarioLogged');
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
