import { Component, Input} from '@angular/core';
import { EntidadDeportiva } from '../../interfaces/entidadDeportiva';

@Component({
  selector: 'app-entidad-tarjeta',
  templateUrl: './entidad-tarjeta.component.html',
  styleUrls: ['./entidad-tarjeta.component.css']
})
export class EntidadTarjetaComponent {

  @Input() entidad!: EntidadDeportiva;

}
