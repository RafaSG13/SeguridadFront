import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { EntidadDeportiva} from '../interfaces/entidadDeportiva';


@Injectable({
  providedIn: 'root'
})
export class EntidadesService {

  private baseUrl: string = environment.baseUrlBackend;


  constructor( private http: HttpClient  ) { }

  getEntidades(): Observable<EntidadDeportiva[]> {
    return this.http.get<EntidadDeportiva[]>(`${ this.baseUrl }/entidades/mostrarEntidades`);
  }

  getEntidadPorNumeroRegistro(numeroRegistro: Number){
    return this.http.get<EntidadDeportiva>(`${ this.baseUrl }/entidades/mostrarEntidadPorNumeroRegistro?numeroRegistro=${ numeroRegistro }`);
  }

  getEntidadesPorNombreEntidad(nombreEntidad: String){
    return this.http.get<EntidadDeportiva[]>(`${ this.baseUrl }/entidades/mostrarEntidadesPorNombre/${ nombreEntidad }`);
  }

  getEntidadesPorLocalidad(localidad: String){
    return this.http.get<EntidadDeportiva[]>(`${ this.baseUrl }/entidades/mostrarEntidadesPorLocalidad/${ localidad }`);
  }

  getEntidadesPorProvincia(provincia: String){
    return this.http.get<EntidadDeportiva[]>(`${ this.baseUrl }/entidades/mostrarEntidadesPorProvincia/${ provincia }`);
  }

  getSugerencias( termino: string ): Observable<EntidadDeportiva[]> {
    return this.http.get<EntidadDeportiva[]>(`${ this.baseUrl }/entidades/buscarEntidadPorNombre?nombreEntidad=${ termino }`);
  }

  agregarEntidad( entidad: EntidadDeportiva ): Observable<EntidadDeportiva> {
    return this.http.post<EntidadDeportiva>(`${ this.baseUrl }/entidades/crearEntidad`, entidad );
  }

  actualizarEntidad( entidad: EntidadDeportiva ): Observable<EntidadDeportiva> {
    return this.http.put<EntidadDeportiva>(`${ this.baseUrl }/entidades/modificarEntidad`, entidad );
  }

  borrarEntidad( numeroRegistro: Number ): Observable<any> {
    return this.http.delete<any>(`${ this.baseUrl }/entidades/eliminarEntidad?numeroRegistro=${ numeroRegistro }`);
  }


}
