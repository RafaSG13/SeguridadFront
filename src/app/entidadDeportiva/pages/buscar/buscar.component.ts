import { Component, OnInit } from '@angular/core';
import { EntidadesService } from '../../services/entidades.service';
import { EntidadDeportiva } from '../../interfaces/entidadDeportiva';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles:[
    `
    .imagenBuscador{
      width: 200px;
      height: 200px;
      border-radius: 10px;
    }
    app-entidad-tarjeta{
      height: 400px;
      width: 200px;
    }
    `
  ]
})
export class BuscarComponent implements OnInit {

  termino: string  = '';
  entidades: EntidadDeportiva[] = [];
  entidadSeleccionada: EntidadDeportiva | undefined;

  constructor( private entidadesService: EntidadesService ) { }

  ngOnInit(): void {
  }


  buscando() {

    this.entidadesService.getSugerencias( this.termino.trim() )
      .subscribe( entidades => this.entidades = entidades );

  }

  opcionSeleccionada( event: MatAutocompleteSelectedEvent ) {

    if(!event.option.value) {
      this.entidadSeleccionada = undefined;
      return;
    }

    const entidad: EntidadDeportiva = event.option.value;
    this.termino = entidad.nombreEntidad;

    this.entidadesService.getEntidadPorNumeroRegistro( entidad.numeroRegistro! )
      .subscribe( entidad => this.entidadSeleccionada = entidad );
  }


}
