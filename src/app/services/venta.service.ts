import { Injectable } from '@angular/core';

import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseApi } from '../Interfaces/response-api';
import { Venta } from '../Interfaces/venta';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  private UrlApi:string = environment.endpoint + "Venta/";
    
  constructor(private http:HttpClient) { }

  Registrar(request:Venta):Observable<ResponseApi>
  {
    return this.http.post<ResponseApi>(`${this.UrlApi}Registrar`, request)
  }

  Historial(BuscarPor:string, NumeroVenta:string, FechaInicio:string, FechaFin:string):Observable<ResponseApi>
  {
    return this.http.get<ResponseApi>(`${this.UrlApi}Historial?BuscarPor=${BuscarPor}&NumeroVenta${NumeroVenta}&FechaInicio${FechaInicio}&FechaFin${FechaFin}`)
  }

  Reporte(FechaInicio:string, FechaFin:string):Observable<ResponseApi>
  {
    return this.http.get<ResponseApi>(`${this.UrlApi}Reporte?FechaInicio${FechaInicio}&FechaFin${FechaFin}`)
  }
}
