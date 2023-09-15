import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { ModalUsuarioComponent } from '../../Modales/modal-usuario/modal-usuario.component';
import { Usuario } from 'src/app/Interfaces/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UtilidadService } from 'src/app/Reutilizable/utilidad.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit, AfterViewInit
{
  ColumnasTablas: string[] = ['NombreCompleto','correo','rolDescripcion','estado','acciones'];
  DataInicio: Usuario[] = [];
  DataListaUsuario = new MatTableDataSource(this.DataInicio);
  @ViewChild(MatPaginator) PaginacionTabla!: MatPaginator;

constructor
(
  private dialog:MatDialog,
  private _UsuarioServicio:UsuarioService,
  private _UtilidadServicio:UtilidadService
){}

ObtenerUsuario()
{
  this._UsuarioServicio.lista().subscribe
    ({
      next: (data)=>
      {
        if (data.status)
        {
          this.DataListaUsuario.data = data.value
        }
        else
        {
          this._UtilidadServicio.MostrarAlerta("No se encontraron datos", "Oops!");
        }
      },
      error:()=>
      {
      },
    })
}

ngOnInit(): void
{
  this.ObtenerUsuario();
}

ngAfterViewInit(): void
{
  this.DataListaUsuario.paginator = this.PaginacionTabla;
}

AplicarFiltroTabla(event: Event)
{
  const filterValue = (event.target as HTMLInputElement).value;
  this.DataListaUsuario.filter = filterValue.trim().toLocaleLowerCase();
}

NuevoUsuario()
{
  this.dialog.open
  (
    ModalUsuarioComponent,
    {
      disableClose:true
    }
  )
  .afterClosed()
  .subscribe(resultado => 
    {
      if (resultado == "true")
      {
        this.ObtenerUsuario();
      }
    });
}

EditarUsuario(Usuario:Usuario)
{
  this.dialog.open
  (
    ModalUsuarioComponent,
    {
      disableClose:true,
      data:Usuario
    }
  )
  .afterClosed()
  .subscribe(resultado => 
    {
      if (resultado == "true")
      {
        this.ObtenerUsuario();
      }
    });
}


EliminarUsuario(Usuario:Usuario)
{
  Swal.fire
  ({
    title: "¿desea eliminar el usuario?",
    text:Usuario.NombreCompleto,
    icon:"warning",
    confirmButtonColor: "#3085d6",
    confirmButtonText: "si, Eliminar",
    showCancelButton:true,
    cancelButtonColor:"#d33",
    cancelButtonText:"No, Volver"
  })
  .then
  ((Resultado) =>
  {
    if (Resultado.isConfirmed)
    {
      this._UsuarioServicio.Eliminar(Usuario.UsuarioId).subscribe
      ({
        next:(data)=>
        {
          if (data.status)
          {
            this._UtilidadServicio.MostrarAlerta("Usuaio elimindo", "!Listo")
            this.ObtenerUsuario();
          }
          else
          {
            this._UtilidadServicio.MostrarAlerta("No se pudo eliminar usuaio", "!Error")
          }
        },
        error:()=>
        {
        },
      })
    }
  })
}
}