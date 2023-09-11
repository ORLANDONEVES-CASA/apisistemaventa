import { Injectable } from '@angular/core';

 import { HttpClient } from "@angular/common/http";
 import { Observable } from 'rxjs';
 import { environment } from 'src/environments/environment';
 import { ResponseApi } from '../Interfaces/response-api';


 import { Login } from '../Interfaces/login';
 import { Usuario } from '../Interfaces/usuario';

 

  @Injectable
  ({
    providedIn: 'root'
  })
  export class UsuarioService
  {
    private UrlApi:string = environment.endpoint + "Usuario/";
    
    constructor(private http:HttpClient) { }

    IniciarSesion(request:Login):Observable<ResponseApi>
    {
      return this.http.post<ResponseApi>(`${this.UrlApi}IniciarSecion`, request)
    }

    lista():Observable<ResponseApi>
    {
      return this.http.get<ResponseApi>(`${this.UrlApi}lista`)
    }

    Guardar(request:Usuario):Observable<ResponseApi>
    {
      return this.http.post<ResponseApi>(`${this.UrlApi}Guardar`, request)
    }

    Editar(request:Usuario):Observable<ResponseApi>
    {
      return this.http.put<ResponseApi>(`${this.UrlApi}Editar`, request)
    }

    Eliminar(id:Number):Observable<ResponseApi>
    {
      return this.http.delete<ResponseApi>(`${this.UrlApi}Eliminar/${id}`)
    }

  }
