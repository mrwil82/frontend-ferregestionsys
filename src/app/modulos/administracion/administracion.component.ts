import { Component, OnInit } from '@angular/core';
import { AdministracionService } from '../../servicios/administracion.service';
import { ContabilidadService } from '../../servicios/contabilidad.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-administracion',
  standalone: false,
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.scss'],
})
export class AdministracionComponent implements OnInit {
  admin: any;
  contabilidad: any;
  id_administracion: any;
  obj_admin = {
    Empresa: '',
    Nit: '',
    Direccion: '',
    Telefono: '',
  };
  validar_Empresa = true;
  validar_Nit = true;
  validar_Direccion = true;
  validar_Telefono = true;
  botones_formulario = false;
  mostrar = false;
  constructor(
    private sadmin: AdministracionService,
    private scontabilidad: ContabilidadService
  ) {}

  ngOnInit(): void {
    this.consulta();
  }

  consulta() {
    this.sadmin.consultar().subscribe((resultado: any) => {
      this.admin = resultado;
    });
  }
  consulta_contabilidad() {
    this.scontabilidad.consultar().subscribe((resultado: any) => {
      this.contabilidad = resultado;
    });
  }
  mostrar_formulario(dato: any) {
    this.mostrar = dato == 'ver' ? true : false;
  }
  limpiar() {
    this.obj_admin = {
      Empresa: '',
      Nit: '',
      Direccion: '',
      Telefono: '',
    };
  }
  validar(funcion: any) {
    if (this.obj_admin.Empresa == '') {
      this.validar_Empresa = false;
    } else {
      this.validar_Empresa = true;
    }
    if (this.obj_admin.Nit == '') {
      this.validar_Nit = false;
    } else {
      this.validar_Nit = true;
    }
    if (this.obj_admin.Direccion == '') {
      this.validar_Direccion = false;
    } else {
      this.validar_Direccion = true;
    }
    if (this.obj_admin.Telefono == '') {
      this.validar_Telefono = false;
    } else {
      this.validar_Telefono = true;
    }

    if (
      this.validar_Empresa == true &&
      this.validar_Nit == true &&
      this.validar_Direccion == true &&
      this.validar_Telefono == true &&
      funcion == 'guardar'
    ) {
      this.guardar();
    }
    if (
      this.validar_Empresa == true &&
      this.validar_Nit == true &&
      this.validar_Direccion == true &&
      this.validar_Telefono == true &&
      funcion == 'editar'
    ) {
      this.editar();
    }
  }
  guardar() {
    this.sadmin.insertar(this.obj_admin).subscribe((datos: any) => {
      if (datos['resultado'] == 'OK') {
        this.consulta();
        Swal.fire({
          title: '¡Guardado!',
          text: 'Los datos han sido guardados correctamente',
          icon: 'success',
          padding: '2em',
          width: '32em'
        });
      }
    });
    this.limpiar();
    this.mostrar_formulario('no ver');
  }
  eliminar(id: any) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success mx-3 px-4',
        cancelButton: 'btn btn-danger mx-3 px-4',
        actions: 'my-3',
        popup: 'swal2-popup-custom', 
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: '¿Estás seguro?',
        text: '¡No podrás revertir esto!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: '¡Sí, elimínalo!',
        cancelButtonText: '¡No, cancelar!',
        reverseButtons: true,
        padding: '2em', 
        width: '32em',
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.sadmin.eliminar(id).subscribe((datos: any) => {
            if (datos['resultado'] == 'OK') {
              this.consulta();
              swalWithBootstrapButtons.fire({
                title: '¡Eliminado!',
                text: 'Tu archivo ha sido eliminado.',
                icon: 'success',
                padding: '2em',
                width: '32em',
              });
            }
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: 'Cancelado',
            text: 'Tu archivo está seguro :)',
            icon: 'error',
            padding: '2em',
            width: '32em',
          });
        }
      });
  }
  cargar_datos(items: any, id: number) {
    this.obj_admin = {
      Empresa: items.Empresa,
      Nit: items.Nit,
      Direccion: items.Direccion,
      Telefono: items.Telefono,
    };
    this.id_administracion = id;
    this.botones_formulario = true;
    this.mostrar_formulario('ver');
  }
  editar() {
    this.sadmin
      .editar(this.id_administracion, this.obj_admin)
      .subscribe((datos: any) => {
        if (datos['resultado'] == 'OK') {
          this.consulta();
          Swal.fire({
            title: '¡Editado!',
            text: 'Los datos han sido editados correctamente',
            icon: 'success',
            padding: '2em',
            width: '32em'
          });
        }
      });
    this.limpiar();
    this.mostrar_formulario('no ver');
  }
}
