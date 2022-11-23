import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';
import { EntidadDeportiva } from '../../interfaces/entidadDeportiva';
import { EntidadesService } from '../../services/entidades.service';

@Component({
  selector: 'app-anadir',
  templateUrl: './anadir.component.html',
  styleUrls: ['./anadir.component.css']
})
export class AnadirComponent implements OnInit {


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
      idTipo: "club",
      valor: "Club"
    }
  ];



  constructor(
    private entidadService: EntidadesService,
    private router:Router,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
    ) { }

  ngOnInit(): void {

    if( !this.router.url.includes('modificar') ) {
      return;
    }

    this.activatedRoute.params
      .pipe(
        switchMap( ({numeroRegistro}) => this.entidadService.getEntidadPorNumeroRegistro(numeroRegistro) )
      )
      .subscribe( entidad => this.entidad = entidad );

      console.log(this.entidad);
  }

  guardar(){
    if( this.entidad.nombreEntidad.trim().length === 0  ) {
      return;
    }

    if ( this.entidad.numeroRegistro  !== 0) {
      // Actualizar
      this.entidadService.actualizarEntidad( this.entidad )
        .subscribe( () => this.mostrarSnakbar('Registro actualizado'));

    } else {
      // Crear
      this.entidadService.agregarEntidad( this.entidad )
        .subscribe(entidad => {
          this.router.navigate(['/entidades/modificar', entidad.numeroRegistro ]);  //COSA RARA DE RUTAS ECHAR UN OJO
          this.mostrarSnakbar('Registro creado');
        })
    }
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
