import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Usuario } from '../interfaces/usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private baseUrl: string = environment.baseUrlBackend;
  public usuarioLogged :Usuario | undefined

  constructor(private http: HttpClient) { }


  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${ this.baseUrl }/usuarios/verUsuarios`);
  }

  getUsuarioPorDNI(dni: string){
    return this.http.get<Usuario>(`${ this.baseUrl }/usuarios/mostrarUsuarioPorDni?dni=${ dni }`);
  }

  getUsuarioPorEmail(email: string){
    return this.http.get<Usuario>(`${ this.baseUrl }/usuarios/mostrarUsuarioPorEmail?email=${ email }`);
  }

  getUsuarioPorNombre(nombre: string){
    return this.http.get<Usuario>(`${ this.baseUrl }/usuarios/mostrarUsuarioPorNombre?nombre=${ nombre }`);
  }


  agregarUsuario( usuario: Usuario ): Observable<Usuario> {
    return this.http.post<Usuario>(`${ this.baseUrl }/usuarios/crearUsuario`, usuario );
  }

  actualizarUsuario(usuario: Usuario ): Observable<Usuario> {
    return this.http.put<Usuario>(`${ this.baseUrl }/usuarios/modificarUsuario`, usuario );
  }

  borrarUsuario( email: string ): Observable<any> {
    return this.http.delete<any>(`${ this.baseUrl }/usuarios/eliminarUsuario?email=${ email }`);
  }

  getSugerencias( termino: string ): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${ this.baseUrl }/usuarios/buscarUsuariosPorEmail?email=${ termino }`);
  }

  mostrarDniEnFuncionDelRol(usuario: Usuario){

    return "";
  }
}
