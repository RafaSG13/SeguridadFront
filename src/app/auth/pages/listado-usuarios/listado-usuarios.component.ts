import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { Usuario } from '../../interfaces/usuario';

@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.component.html'
})
export class ListadoUsuariosComponent implements OnInit {

  public usuarios : Usuario[] = [];

  constructor(private usuarioService: UsuariosService) { }

  ngOnInit(): void {
    this.usuarioService.getUsuarios()
    .subscribe( usuariosLista => this.usuarios = usuariosLista );
  }

}
