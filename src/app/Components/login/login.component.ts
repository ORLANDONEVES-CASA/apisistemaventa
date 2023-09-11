import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
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
    private usuarioServicio: UsuarioService,
    private utilidadservicio: UtilidadService
  )
  {
    this.FormularioLogin = this.fb.group
    ({
      email:["", Validators.required],
      password:["", Validators.required]
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
      Clave:this.FormularioLogin.value.password,
    }
    this.usuarioServicio.IniciarSesion(request).subscribe
    ({
      next: (data) =>
      {
        if(data.status)
        {
          this.utilidadservicio.GuardarSesionUsuario(data.value);
          this.router.navigate(["pages"])
        }
        else
        {
          this.utilidadservicio.MostrarAlerta("No se puede encontrar coinsidencias","Opps!");
        }
      },
      complete:() =>
      {
        this.MostrarLoading=true;
        
      },
      error: ()=>
      {
        this.utilidadservicio.MostrarAlerta("Error, hubo problemas al cargar", "Opps!");
      },
    })
  }
}



