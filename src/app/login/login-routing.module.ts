import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './pages/main/main.component';
import { RegisterComponent } from './pages/register/register.component';


const rutas: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'registro', component: RegisterComponent },
      { path: '**', redirectTo: 'login' },
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
export class LoginRoutingModule { }
