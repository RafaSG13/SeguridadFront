import { Component, OnInit } from '@angular/core';
import { EntidadesService } from '../../services/entidades.service';
import { EntidadDeportiva } from '../../interfaces/entidadDeportiva';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html'
})
export class ListadoComponent implements OnInit {

  public entidades: EntidadDeportiva[] = [];

  constructor(private entidadesService: EntidadesService) {}

  ngOnInit(): void {

    this.entidadesService.getEntidades()
    .subscribe( entidades => this.entidades = entidades );
  }



}
