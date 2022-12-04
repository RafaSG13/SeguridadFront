import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    email:    ['', [ Validators.required, Validators.email ]],
    password: ['', [ Validators.required, Validators.minLength(6) ]],
  });

  constructor( private fb: FormBuilder,
               private router: Router,
               private usuarioService: UsuariosService ) { }


  registro() {
    const { name, email, password } = this.miFormulario.value;
  }



}
