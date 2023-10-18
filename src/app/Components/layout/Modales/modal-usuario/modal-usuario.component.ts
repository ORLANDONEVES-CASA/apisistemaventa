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
      nombrecompleto: ['', Validators.required],
      correo: ['', Validators.required],
      rolId: ['', Validators.required],
      clave: ['', Validators.required],
      activo: ['1', Validators.required]
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
         nombrecompleto: this.DatosUsuario.nombreCompleto,
         correo: this.DatosUsuario.correo,
         rolId: this.DatosUsuario.rolId,
         clave: this.DatosUsuario.clave,
         activo: this.DatosUsuario.activo.toString()
       })
     }
   }

   GuardarEditar_usuario()
   {
    const _usuario:Usuario =
    {
      usuarioId: this.FormularioUsuario == null ? 0:this.DatosUsuario.usuarioId,
      nombreCompleto: this.FormularioUsuario.value.nombreCompleto,
      correo: this.FormularioUsuario.value.correo,
      rolId: this.FormularioUsuario.value.rolid,
      rolDescripcion: "",
      clave: this.FormularioUsuario.value.clave,
      activo: parseInt(this.FormularioUsuario.value.activo)
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