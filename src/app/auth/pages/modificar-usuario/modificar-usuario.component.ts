import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-modificar-usuario',
  templateUrl: './modificar-usuario.component.html',
  styles: [
    `
    .error{
      color:red;
      display:block ;
    }
    `
  ]
})
export class ModificarUsuarioComponent implements OnInit {

  usuario = {
    email : "",
    dni: "",
    nombre: "",
    apellido: "",
    rol: "",
    password: ""
  }

  roles = [{idTipo: "Usuario",valor: "Usuario"},{idTipo: "Administrador",valor: "Administrador"}];

  errorPass : boolean = false;

  constructor(
    private usuarioService : UsuariosService,
    private router:Router,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    public dialog: MatDialog) { }

  ngOnInit(): void {

    this.activatedRoute.params
    .pipe(
      switchMap( ({email}) => this.usuarioService.getUsuarioPorEmail(email) )
    )
    .subscribe( usuario => this.usuario = usuario );

  }

  get canDelete():boolean{

    if(this.usuarioService.usuarioLogged?.rol == "Superadministrador"){
      return true;
    }

    else{
      return false;
    }
  }

  modificar(){

    if(this.usuarioService.comprobarPass(this.usuario.password) === false){
      console.log("MALA PASS")
      this.errorPass = true;
      return;
    }
    this.usuarioService.actualizarUsuario( this.usuario )
    .subscribe( () => this.mostrarSnakbar('Registro actualizado'));

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
