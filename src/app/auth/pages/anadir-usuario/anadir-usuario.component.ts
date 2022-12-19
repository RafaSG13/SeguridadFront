import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-anadir-usuario',
  templateUrl: './anadir-usuario.component.html',
  styles:[`
    mat-form-field{
      margin: 5px;
    }
    .error{
      color:red;
      display:block ;
    }
    `]
})
export class AnadirUsuarioComponent implements OnInit {

  usuario = {
    email : "",
    dni: "",
    nombre: "",
    apellido: "",
    rol: "",
    password: ""
  }

  roles = [{idTipo: "Usuario",valor: "Usuario"},{idTipo: "Administrador",valor: "Administrador"}];

  //Para indicar que la contraseña esta mal
  errorPass : boolean = false;


  constructor(
    private usuarioService : UsuariosService,
    private router:Router,
    private snackBar: MatSnackBar,
    public dialog: MatDialog) { }

  ngOnInit(): void {

  }

  crear(){
    if( this.usuario.nombre.trim().length === 0  ) {
      return;
    }
    // Crear
    if(this.usuarioService.comprobarPass(this.usuario.password) === false){
      this.errorPass = true;
      return;
    }
    this.usuarioService.agregarUsuario( this.usuario )
      .subscribe(usuario => {
        this.mostrarSnakbar('Registro creado '+ usuario.email);
      })

  }


  borrar() {

    const dialog = this.dialog.open( ConfirmarComponent, {
      width: '250px',
      data: this.usuario
    });

    dialog.afterClosed().subscribe(
      (result) => {

        if( result ) {
          this.usuarioService.borrarUsuario( this.usuario.email! )
            .subscribe( resp => {
              this.router.navigate(['/usuarios/listado']);
            });
        }

      }
    )
  }

  mostrarSnakbar( mensaje: string ) {

    this.snackBar.open( mensaje, 'ok!', {
      duration: 2500
    });

  }
}
