import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-cambiar-password',
  templateUrl: './cambiar-password.component.html'
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
    // Crear
    this.usuario.email != localStorage.getItem('usuarioLogged');
    this.usuario.password = this.pass1;
    this.usuarioService.changePass( this.usuario )
      .subscribe(usuario => {
        this.mostrarSnakbar('Contraseña Cambiada ');
      })

  }

  mostrarSnakbar( mensaje: string ) {

    this.snackBar.open( mensaje, 'ok!', {
      duration: 2500
    });

  }
}
