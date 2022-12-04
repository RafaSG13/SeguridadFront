import { Component, Input, OnInit } from '@angular/core';
import { Usuario } from '../../interfaces/usuario';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-carta-usuario',
  templateUrl: './carta-usuario.component.html',
  styleUrls: ['./carta-usuario.component.css']
})
export class CartaUsuarioComponent implements OnInit {
  @Input() usuario!: Usuario;

  constructor(private usuarioService: UsuariosService) { }

  ngOnInit(): void {
  }

  get dniPorRol(){
    return this.usuarioService.getDniPorRol(this.usuario);
   }

}
