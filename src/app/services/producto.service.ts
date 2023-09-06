import { Injectable } from '@angular/core';

import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseApi } from '../Interfaces/response-api';
import { Producto } from '../Interfaces/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private UrlApi:string = environment.endpoint + "Producto/";
    
  constructor(private http:HttpClient) { }

  lista():Observable<ResponseApi>
    {
      return this.http.get<ResponseApi>(`${this.UrlApi}lista`)
    }

    Guardar(request:Producto):Observable<ResponseApi>
    {
      return this.http.post<ResponseApi>(`${this.UrlApi}Guardar`, request)
    }

    Editar(request:Producto):Observable<ResponseApi>
    {
      return this.http.put<ResponseApi>(`${this.UrlApi}Editar`, request)
    }

    Eliminar(id:Number):Observable<ResponseApi>
    {
      return this.http.delete<ResponseApi>(`${this.UrlApi}Eliminar/${id}`)
    }

}
