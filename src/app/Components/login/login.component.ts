import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/Interfaces/login';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UtilidadService } from 'src/app/Reutilizable/utilidad.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit
{
  FormularioLogin:FormGroup;
  OcultarPassword:boolean=true;
  MostrarLoading:boolean=false;

  constructor
  (
    private fb:FormBuilder,
    private router:Router,
    private _usuarioServicio: UsuarioService,
    private _utilidadservicio: UtilidadService
  )

  {
    this.FormularioLogin = this.fb.group
    ({
      email:['', Validators.required],
      password:['', Validators.required]
    });
  }

  ngOnInit(): void
  {
  }

  iniciarSesion()
  {
    this.MostrarLoading = true;
    const request:Login = 
    {
      Correo:this.FormularioLogin.value.email,
      Clave:this.FormularioLogin.value.password
    }
    this._usuarioServicio.IniciarSesion(request).subscribe
    ({
      next: (data) =>
      {
        if(data.status)
        {
          this._utilidadservicio.GuardarSesionUsuario(data.value);
          this.router.navigate(["pages"])
        }
        else
        {
          this._utilidadservicio.MostrarAlerta("No se encontró coinsidencias","Opps!")
        }
      },
      complete:() =>
      {
        this.MostrarLoading=false;
        
      },
      error: ()=>
      {
        this._utilidadservicio.MostrarAlerta("Error, hubo problemas al cargar", "Opps!")
      },
    })
  }
}



