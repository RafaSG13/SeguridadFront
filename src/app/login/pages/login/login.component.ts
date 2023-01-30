import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Usuario } from '../../../auth/interfaces/usuario';
import { UsuariosService } from '../../../auth/services/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
    `
    .error{
      color:red;
      display:block ;
    }
    `
  ]
})
export class LoginComponent  implements OnInit{

  usuario : Usuario ={
    email: '',
    password : '',
    nombre : '',
    dni : '',
    apellido: '',
    rol: ''

  }

  error : boolean = false;
  resultado: Usuario | undefined;

  miFormulario: FormGroup = this.fb.group({
    email:    ['', [ Validators.required, Validators.email ]],
    password: ['', [ Validators.required, Validators.minLength(6) ]],
  });


  ngOnInit(): void {
   /* localStorage.clear(); */
  }

  constructor( private fb: FormBuilder,
               private router: Router,
               private usuarioService: UsuariosService) { }


  login() {
    const { email, password } = this.miFormulario.value;
    this.usuario.email = email;
    this.usuario.password = password;

    this.usuarioService.getLogin(this.usuario).subscribe(result =>{
        this.resultado = result;
        if(this.resultado !== null){
          this.error = false;
          this.usuarioService.usuarioLogged = this.resultado;
          window.localStorage.setItem('usuarioLogged',this.resultado.email);

          if(this.resultado.rol=="Usuario")
            this.router.navigate(['/entidades/listado']);
          else
            this.router.navigate(['/usuarios/listado']);

        }
        else{
          this.error = true;
        }
    });

  }
}
