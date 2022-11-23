import { Component, Input, OnInit } from '@angular/core';
import { Usuario } from '../../interfaces/usuario';

@Component({
  selector: 'app-carta-usuario',
  templateUrl: './carta-usuario.component.html',
  styleUrls: ['./carta-usuario.component.css']
})
export class CartaUsuarioComponent implements OnInit {
  @Input() usuario!: Usuario;

  constructor() { }

  ngOnInit(): void {
  }

}
