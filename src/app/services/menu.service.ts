import { Injectable } from '@angular/core';

 import { HttpClient } from "@angular/common/http";
 import { Observable } from 'rxjs';
 import { environment } from 'src/environments/environment';
 import { ResponseApi } from '../Interfaces/response-api';


@Injectable
 ({
  providedIn: 'root'
 })
export class MenuService
{
  private UrlApi:string = environment.endpoint + "Menu/";

  constructor(private http:HttpClient) { }

  lista(UsuarioID:number):Observable<ResponseApi>
  {
    return this.http.get<ResponseApi>(`${this.UrlApi}lista?UsuarioID=${UsuarioID}`)
  }
}
