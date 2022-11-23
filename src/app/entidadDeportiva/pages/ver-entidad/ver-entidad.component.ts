import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EntidadDeportiva } from '../../interfaces/entidadDeportiva';
import { EntidadesService } from '../../services/entidades.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-ver-entidad',
  templateUrl: './ver-entidad.component.html',
  styles:[
    `
      .imagenEntidad{
        border-radius: 10px;
        height: 400px;
        width: 400px;
      }
    `

  ]
})
export class VerEntidadComponent implements OnInit {


  constructor(private activatedRoute: ActivatedRoute,
     private entidadesService:EntidadesService,
     private router: Router) { }
  public entidad !: EntidadDeportiva;


  ngOnInit(): void {
    this.activatedRoute.params
    .pipe(
      switchMap( ({ numeroRegistro }) => this.entidadesService.getEntidadPorNumeroRegistro( numeroRegistro) )
    )
    .subscribe( entidad => this.entidad = entidad );
      console.log(this.entidad)
  }

  regresar() {
    this.router.navigate(['/entidades/listado']);
  }

}
