import { Injectable } from '@angular/core';

import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseApi } from '../Interfaces/response-api';

@Injectable({
  providedIn: 'root'
})
export class DashBoardService {

  private UrlApi:string = environment.endpoint + "DashBoard/";
    
  constructor(private http:HttpClient) { }

  Resumen():Observable<ResponseApi>
  {
    return this.http.get<ResponseApi>(`${this.UrlApi}Resumen`)
  }
}
