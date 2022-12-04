import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { UsuariosService } from '../../services/usuarios.service';
import { Usuario } from '../../interfaces/usuario';


@Component({
  selector: 'app-ver-usuario',
  templateUrl: './ver-usuario.component.html',
  styles:[
    `
    .imagenUsuario{
      border-radius: 10px;
      height: 400px;
      width: 400px;
    }
  `
  ]
})
export class VerUsuarioComponent implements OnInit {


  constructor(private activatedRoute: ActivatedRoute,
    private usuarioService:UsuariosService,
    private router: Router) { }
 public usuario !: Usuario;


 ngOnInit(): void {
   this.activatedRoute.params
   .pipe(
     switchMap( ({ email }) => this.usuarioService.getUsuarioPorEmail( email) )
   )
   .subscribe( usuario => this.usuario = usuario );
     console.log(this.usuario)
 }

 regresar() {
   this.router.navigate(['/usuarios/listado']);
 }

 get dniPorRol(){
  return this.usuarioService.getDniPorRol(this.usuario);
 }

}
