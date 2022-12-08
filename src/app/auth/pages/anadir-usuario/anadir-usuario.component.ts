import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-anadir-usuario',
  templateUrl: './anadir-usuario.component.html',
  styles:[`
    mat-form-field{
      margin: 5px;
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

  roles = [
    {
      idTipo: "Usuario",
      valor: "Usuario"
    },
    {
      idTipo: "Administrador",
      valor: "Administrador"
    }
  ];

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
    this.usuarioService.agregarUsuario( this.usuario )
      .subscribe(usuario => {
        this.router.navigate(['/usuarios/modificar', usuario.email ]);  //COSA RARA DE RUTAS ECHAR UN OJO
        this.mostrarSnakbar('Registro creado');
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
              this.router.navigate(['/entidades']);
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
