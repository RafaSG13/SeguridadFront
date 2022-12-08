import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/auth/interfaces/usuario';
/* import Swal from 'sweetalert2';
 */

import { UsuariosService } from '../../../auth/services/usuarios.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent {

  miFormulario: FormGroup = this.fb.group({
    name:     ['', [ Validators.required ]],
    apellido: ['', [ Validators.required ]],
    dni: ['', [ Validators.required]],
    email:    ['', [ Validators.required]],
    password: ['', [ Validators.required]],
  });

  constructor( private fb: FormBuilder,
               private router: Router,
               private usuarioService: UsuariosService ) { }


  registro() {
    const { name, apellido, dni, email, password } = this.miFormulario.value;
    let usuario : Usuario = {
      email: email,
      dni: dni,
      nombre: name,
      apellido: apellido,
      password: password,
      rol : 'Usuario'
    }
    this.usuarioService.agregarUsuario(usuario).subscribe( resutl =>{
      console.log(resutl);
      this.router.navigate(['/login/login']);
    })
  }



}
