import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { MaterialModule } from '../material/material.module';
import { HomeComponent } from '../shared/home/home.component';
import { RouterModule } from '@angular/router';
import { ListadoComponent } from './pages/listado/listado.component';
import { EntidadesRoutingModule } from './entidades-routing.module';
import { EntidadTarjetaComponent } from './components/entidad-tarjeta/entidad-tarjeta.component';
import { FlexLayoutModule } from "@angular/flex-layout";
import { AnadirComponent } from './pages/anadir/anadir.component';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { VerEntidadComponent } from './pages/ver-entidad/ver-entidad.component';
import { ConfirmarComponent } from './components/confirmar/confirmar.component';
import { ModificarComponent } from './pages/modificar/modificar.component';





@NgModule({
  declarations: [
    ListadoComponent,
    EntidadTarjetaComponent,
    AnadirComponent,
    BuscarComponent,
    VerEntidadComponent,
    ConfirmarComponent,
    ModificarComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule,
    EntidadesRoutingModule
  ]
})
export class EntidadDeportivaModule { }
