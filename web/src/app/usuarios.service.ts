import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuariosModel } from './usuarios/usuarios.model';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient) { }

  listarUsuarios(): Observable<any> {
    return this.http.get("http://localhost:8080/usuarios");
  }

  cadastrarUsuario(usuario: UsuariosModel): Observable<Object> {
    return this.http.post("http://localhost:8080/usuario", usuario);
  }
}
