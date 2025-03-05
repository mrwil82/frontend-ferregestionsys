import { Component, OnInit } from '@angular/core';
import { Soporte_TecnicoService } from '../../servicios/soporte_tecnico.service';
import { AdministracionService } from '../../servicios/administracion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-soporte-tecnico',
  standalone: false,
  templateUrl: './soporte_tecnico.component.html',
  styleUrls: ['./soporte_tecnico.component.scss'],
})
export class Soporte_TecnicoComponent implements OnInit {
  soporte_tecnico: any;
  id_soporte_tecnico: any;
  administracion: any;
  obj_soporte_tecnico = {
    Incidencia: '',
    Tecnico: '',
    Solucion: '',
  };
  validar_Incidencia = true;
  validar_Tecnico = true;
  validar_Solucion = true;
  mostrar = false;
  botones_formulario = false;

  constructor(
    private ssoporte_tecnico: Soporte_TecnicoService,
    private sadmin: AdministracionService
  ) {}

  ngOnInit(): void {
    this.consulta();
  }
  consulta() {
    this.ssoporte_tecnico.consultar().subscribe((resultado: any) => {
      this.soporte_tecnico = resultado;
    });
  }
  consulta_administracion() {
    this.sadmin.consultar().subscribe((resultado: any) => {
      this.administracion = resultado;
    });
  }
  mostrar_formulario(dato: any) {
    this.mostrar = dato == 'ver' ? true : false;
  }
  limpiar() {
    this.obj_soporte_tecnico = {
      Incidencia: '',
      Tecnico: '',
      Solucion: '',
    };
  }
  validar(funcion: any) {
    if (this.obj_soporte_tecnico.Incidencia == '') {
      this.validar_Incidencia = false;
    } else {
      this.validar_Incidencia = true;
    }
    if (this.obj_soporte_tecnico.Tecnico == '') {
      this.validar_Tecnico = false;
    } else {
      this.validar_Tecnico = true;
    }
    if (this.obj_soporte_tecnico.Solucion == '') {
      this.validar_Solucion = false;
    } else {
      this.validar_Solucion = true;
    }

    if (
      this.validar_Incidencia == true &&
      this.validar_Tecnico == true &&
      this.validar_Solucion == true && funcion == 'guardar'
    ) {
      this.guardar();
    }
    if (
      this.validar_Incidencia == true &&
      this.validar_Tecnico == true &&
      this.validar_Solucion == true && funcion == 'editar'
    ) {
      this.editar();
    }
  }
  guardar() {
    this.ssoporte_tecnico
      .insertar(this.obj_soporte_tecnico)
      .subscribe((datos: any) => {
        if (datos['resultado'] == 'OK') {
          this.consulta();
          Swal.fire({
            title: '¡Guardado!',
            text: 'Los datos han sido guardados correctamente',
            icon: 'success',
            padding: '2em',
            width: '32em',
          });
        }
      });

    this.limpiar();
    this.mostrar_formulario('no ver');
  }
  eliminar(id: any) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success mx-3 px-4', // Added margin and padding
        cancelButton: 'btn btn-danger mx-3 px-4', // Added margin and padding
        actions: 'my-3', // Added vertical margin to button container
        popup: 'swal2-popup-custom', // Custom class for popup
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
        padding: '2em', // Added more padding to the popup
        width: '32em', // Made popup slightly wider
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.ssoporte_tecnico.eliminar(id).subscribe((datos: any) => {
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
    this.obj_soporte_tecnico = {
      Incidencia: items.Incidencia,
      Tecnico: items.Tecnico,
      Solucion: items.Solucion,
    };
    this.id_soporte_tecnico = id;
    this.mostrar_formulario('ver');
    this.botones_formulario = true;
  }
  editar() {
    this.ssoporte_tecnico
      .editar(this.id_soporte_tecnico, this.obj_soporte_tecnico)
      .subscribe((datos: any) => {
        if (datos['resultado'] == 'OK') {
          this.consulta();
          Swal.fire({
            title: '¡Editado!',
            text: 'Los datos han sido editados correctamente',
            icon: 'success',
            padding: '2em',
            width: '32em',
          });
        }
      });
    this.limpiar();
    this.mostrar_formulario('no ver');
  }
}
