import { Injectable } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Sesion } from '../Interfaces/sesion';


@Injectable({
  providedIn: 'root'
})
export class UtilidadService {

  constructor(private _snackbar:MatSnackBar) { }

  MostrarAlerta(mensaje:string, tipo:string)
  {
    this._snackbar.open(mensaje,tipo,{
      horizontalPosition:"end",
      verticalPosition:"top",
      duration:4000
    })
  }

 GuardarSesionUsuario(UsuarioSesion: Sesion)
 {
  localStorage.setItem("usuario", JSON.stringify(UsuarioSesion))
 }

 ObtenerSesionUsuario()
 {
  const dataCadena = localStorage.getItem("usuario")
  const usuario = JSON.parse(dataCadena!)
  return usuario;
 }

 EliminarUsuario()
 {
  localStorage.removeItem("usuario")
 }
}
