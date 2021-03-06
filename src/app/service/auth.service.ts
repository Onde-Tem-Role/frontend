import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Usuario } from '../model/Usuario';
import { UsuarioLogin } from '../model/UsuarioLogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

    token = {
      headers: new HttpHeaders().set('Authorization', environment.token),
    }

     refreshToken() {
      this.token = {
        headers: new HttpHeaders().set('Authorization', environment.token)
      }
    }

  getByIdUsuario(id: number): Observable<Usuario>{
    return this.http.get<Usuario>(`https://ondetemrolee.herokuapp.com/usuarios/${id}`, this.token)
  }

  entrar(userLogin: UsuarioLogin): Observable<UsuarioLogin>{
    return this.http.post<UsuarioLogin>('https://ondetemrolee.herokuapp.com/usuarios/logar', userLogin)
  }

  cadastrar(user: Usuario): Observable<Usuario>{
    return this.http.post<Usuario>('https://ondetemrolee.herokuapp.com/usuarios/cadastrar', user)
 }

 atualizar(usuario: Usuario):Observable<Usuario>{
  return this.http.put<Usuario>('https://ondetemrolee.herokuapp.com/usuarios/atualizar', usuario, this.token)
}

deleteUsuario(id: number) {
  return this.http.delete(`https://ondetemrolee.herokuapp.com/usuarios/${id}`, this.token)
}

 logado(){
   let ok: boolean = false

   if(environment.token != ''){
    ok = true
   }
   return ok
    }

     admin(){
       let ok: boolean = false

       if (environment.tipo === 'guia' || environment.tipo === 'admin'){
         ok = true
       }

       return ok
     }

  }
