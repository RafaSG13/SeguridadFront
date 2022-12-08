import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanLoad } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';


const routes: Routes = [
  {
    path: 'usuarios',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule ),
    canActivate:[AuthGuard],
    canLoad:[AuthGuard]

  },
  {
    path: 'entidades',
    loadChildren: () => import('./entidadDeportiva/entidad-deportiva.module').then( m => m.EntidadDeportivaModule ),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginModule ),
  },
  {
    path: '**',
    redirectTo:'login'
  },


]


@NgModule({
  imports: [
    RouterModule.forRoot( routes )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
