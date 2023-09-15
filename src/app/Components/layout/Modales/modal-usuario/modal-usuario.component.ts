import { Component, OnInit, Inject } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Rol } from 'src/app/Interfaces/rol';
import { Usuario } from 'src/app/Interfaces/usuario';

import { RolService } from 'src/app/services/rol.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UtilidadService } from 'src/app/Reutilizable/utilidad.service';

@Component({
  selector: 'app-modal-usuario',
  templateUrl: './modal-usuario.component.html',
  styleUrls: ['./modal-usuario.component.css']
})
export class ModalUsuarioComponent implements OnInit
{
  FormularioUsuario:FormGroup;
  OcultarPassword:boolean=true;
  TituloAccion:string="Agregar";
  BotonAccion:string="Guardar";
  ListaRoles:Rol[]=[];

  constructor
  (
    private ModalActual: MatDialogRef<ModalUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public DatosUsuario:Usuario,
    private fb: FormBuilder,
    private _RolServicio: RolService,
    private _UsuarioServicio: UsuarioService,
    private _UtilidadServicio: UtilidadService,
  )
  {
    this.FormularioUsuario = this.fb.group
    ({
      NombreCompleto: ['', Validators.required],
      Correo: ['', Validators.required],
      RolId: ['', Validators.required],
      Clave: ['', Validators.required],
      Activo: ['1', Validators.required]
    });
    if (this.DatosUsuario!=null)
    {
      this.TituloAccion="Editar";
      this.BotonAccion="Actualizar";
    }
    this._RolServicio.lista().subscribe
    ({
      next: (data)=>
      {
        if (data.status)
        {
          this.ListaRoles=data.value
        }
      },
      error:()=>
      {
      },
    })
  }

  ngOnInit(): void
  {
    if (this.DatosUsuario!=null)
    {
      this.FormularioUsuario.patchValue
      ({
        NombreCompleto: this.DatosUsuario.NombreCompleto,
        Correo: this.DatosUsuario.Correo,
        RolId: this.DatosUsuario.RolId,
        Clave: this.DatosUsuario.Clave,
        Activo: this.DatosUsuario.Activo.toString()
      })
    }
  }

  GuardarEditar_usuario()
  {
    const _usuario:Usuario =
    {
      UsuarioId:this.DatosUsuario == null ? 0:this.DatosUsuario.UsuarioId,
      NombreCompleto: this.FormularioUsuario.value.NombreCompleto,
      Correo: this.FormularioUsuario.value.Correo,
      RolId: this.FormularioUsuario.value.RolId,
      RolDescripcion: "",
      Clave: this.FormularioUsuario.value.Clave,
      Activo: parseInt(this.FormularioUsuario.value.Activo)
    }
    if (this.DatosUsuario == null)
    {
      this._UsuarioServicio.Guardar(_usuario).subscribe
      ({
        next:(data)=>
        {
          if (data.status)
          {
            this._UtilidadServicio.MostrarAlerta("El usuario fue registrado","Exito");
            this.ModalActual.close("true")
          }
          else
          {
            this._UtilidadServicio.MostrarAlerta("No se pudo registrar el usuario","Error");
          }
        },
        error:()=>
        {
        },
      })
    }
    else
    {
      this._UsuarioServicio.Editar(_usuario).subscribe
      ({
        next:(data)=>
        {
          if (data.status)
          {
            this._UtilidadServicio.MostrarAlerta("El usuario fue editado","Exito");
            this.ModalActual.close("true")
          }
          else
          {
            this._UtilidadServicio.MostrarAlerta("No se pudo editar el usuario","Error");
          }
        },
        error:()=>
        {
        },
      })
    }
  }
}