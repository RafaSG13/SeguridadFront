import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { UsuariosService } from 'src/app/auth/services/usuarios.service';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';
import { EntidadDeportiva } from '../../interfaces/entidadDeportiva';
import { EntidadesService } from '../../services/entidades.service';

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.component.html',
  styleUrls: ['./modificar.component.css']
})
export class ModificarComponent implements OnInit {

  entidad: EntidadDeportiva = {
    nombreEntidad: '',
    numeroRegistro: 0,
    provincia: '',
    localidad: '',
    imagen: '',
    tipo: ''
  }
  tipos = [
    {
      idTipo: "Club",
      valor: "Club"
    },
    {
      idTipo: "Federacion",
      valor: "Federacion"
    }
  ];

  constructor(
    private userService : UsuariosService,
    private entidadService: EntidadesService,
    private router:Router,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
    ) { }

  ngOnInit(): void {

    this.activatedRoute.params
    .pipe(
      switchMap( ({numeroRegistro}) => this.entidadService.getEntidadPorNumeroRegistro(numeroRegistro) )
    )
    .subscribe( entidad => this.entidad = entidad );

  }
  get canDelete():boolean{
    if(this.userService.usuarioLogged?.rol == "Superadministrador"){
      return true;
    }

    else{
      return false;
    }
  }

  modificar(){
    this.entidadService.actualizarEntidad( this.entidad )
    .subscribe( () => this.mostrarSnakbar('Registro actualizado'));

  }


  borrar() {

    const dialog = this.dialog.open( ConfirmarComponent, {
      width: '250px',
      data: this.entidad
    });

    dialog.afterClosed().subscribe(
      (result) => {

        if( result ) {
          this.entidadService.borrarEntidad( this.entidad.numeroRegistro! )
            .subscribe( resp => {
              this.router.navigate(['/entidades/listado']);
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
