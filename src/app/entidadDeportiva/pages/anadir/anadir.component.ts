import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { EntidadDeportiva } from '../../interfaces/entidadDeportiva';
import { EntidadesService } from '../../services/entidades.service';
import { UsuariosService } from '../../../auth/services/usuarios.service';

@Component({
  selector: 'app-anadir',
  templateUrl: './anadir.component.html'
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
      idTipo: "Club",
      valor: "Club"
    },
    {
      idTipo: "Federacion",
      valor: "Federacion"
    }
  ];



  constructor(
    private entidadService: EntidadesService,
    private userService : UsuariosService,
    private router:Router,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
    ) { }

  ngOnInit(): void {
  }


  get canCreate() : boolean{
    if(this.userService.usuarioLogged?.rol=="Usuario" || this.userService.usuarioLogged?.rol=="Superadministrador")
      return true;
    else
      return false;
  }

  crear(){
    if( this.entidad.nombreEntidad.trim().length === 0  ) {
      return;
    }

      // Crear
      this.entidad.numeroRegistro = 99999;
      this.entidadService.agregarEntidad( this.entidad )
        .subscribe(entidad => {
          this.router.navigate(['/entidades/modificar', entidad.numeroRegistro ]);  //COSA RARA DE RUTAS ECHAR UN OJO
          this.mostrarSnakbar('Registro creado');
        })

  }

  mostrarSnakbar( mensaje: string ) {

    this.snackBar.open( mensaje, 'ok!', {
      duration: 2500
    });

  }
}
