import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Usuario } from '../../interfaces/usuario';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-buscar-usuario',
  templateUrl: './buscar-usuario.component.html',
  styleUrls: ['./buscar-usuario.component.css']
})
export class BuscarUsuarioComponent implements OnInit {

  termino: string  = '';
  usuarios: Usuario[] = [];
  usuarioSeleccionado: Usuario | undefined;
  constructor(private usuarioService: UsuariosService) { }

  ngOnInit(): void {
  }

  buscando() {

    this.usuarioService.getSugerencias( this.termino.trim() )
      .subscribe( usuarios => this.usuarios = usuarios );

  }

  opcionSeleccionada( event: MatAutocompleteSelectedEvent ) {

    if(!event.option.value) {
      this.usuarioSeleccionado = undefined;
      return;
    }

    const usuario: Usuario = event.option.value;
    this.termino = usuario.email;

    this.usuarioService.getUsuarioPorEmail( usuario.email! )
      .subscribe( usuario => this.usuarioSeleccionado = usuario );
      console.log(this.usuarioSeleccionado?.email)
  }

}
