import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../shared/home/home.component';

import { ListadoComponent } from './pages/listado/listado.component';
import { AnadirComponent } from './pages/anadir/anadir.component';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { VerEntidadComponent } from './pages/ver-entidad/ver-entidad.component';
import { ModificarComponent } from './pages/modificar/modificar.component';



const rutas: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'listado', component: ListadoComponent },
      { path: 'anadir', component: AnadirComponent },
      { path: 'modificar/:numeroRegistro', component: ModificarComponent },
      { path: 'buscar', component: BuscarComponent },
      { path: ':numeroRegistro', component: VerEntidadComponent },
      { path: '**', redirectTo: '' }
    ]
  }
];




@NgModule({
  imports: [
    RouterModule.forChild( rutas )
  ],
  exports: [
    RouterModule
  ]
})
export class EntidadesRoutingModule { }
