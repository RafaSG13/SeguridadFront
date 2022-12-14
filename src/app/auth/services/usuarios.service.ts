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
  minPassLength : Number = 6;

  constructor(private http: HttpClient) { }

  recarga(): Usuario{
    var email = localStorage.getItem('usuarioLogged')
    if(email != null){
      this.getUsuarioPorEmail(email) .subscribe( usuario => this.usuarioLogged = usuario );
    }
    return {...this.usuarioLogged!};
  }

  getDniPorRol(usuario : Usuario): string{
    var dni = '';
    if(this.usuarioLogged?.rol=='Administrador'){
      for(let i = 0 ; i < usuario.dni.length; i++){
        if(Math.log2(i) % 1 == 0 ){
          dni += 'X';
        }
        else{
          dni+=usuario.dni[i];
        }
      }
    }else if(this.usuarioLogged?.rol=='Superadministrador'){

      dni =  usuario.dni;
    }
    return dni;

  }


  changePass( usuario: Usuario ): Observable<Usuario> {
    return this.http.post<Usuario>(`${ this.baseUrl }/usuarios/cambiarContrasena`, usuario );
  }

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${ this.baseUrl }/usuarios/verUsuarios`);
  }

  getUsuarioPorEmail(email: string){
    return this.http.get<Usuario>(`${ this.baseUrl }/usuarios/mostrarUsuarioPorEmail?email=${ email }`);
  }

  agregarUsuario( usuario: Usuario ): Observable<Usuario> {
    return this.http.post<Usuario>(`${ this.baseUrl }/usuarios/crearUsuario`, usuario );
  }

  actualizarUsuario(usuario: Usuario ): Observable<Usuario> {
    return this.http.post<Usuario>(`${ this.baseUrl }/usuarios/modificarUsuario`, usuario );
  }

  borrarUsuario( email: string ): Observable<any> {
    return this.http.delete<any>(`${ this.baseUrl }/usuarios/eliminarUsuario?email=${ email }`);
  }

  getSugerencias( termino: string ): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${ this.baseUrl }/usuarios/buscarUsuariosPorEmail?email=${ termino }`);
  }

  getLogin(usuario : Usuario){
    return this.http.post<Usuario>(`${ this.baseUrl }/usuarios/login`,usuario);
  }

  comprobarPass(pwd : string): boolean{
    let valid : boolean = true;
    if(pwd.length < this.minPassLength)
      return false;
    if(pwd.toLocaleLowerCase() === pwd)
      return false;
    if(pwd.toUpperCase() === pwd)
      return false;
    if(/\d/.test(pwd) === false)
      return false;
    if(/[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(pwd) === false)
      return false;


      return valid;
  }
}
