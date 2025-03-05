import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from '../../servicios/empleado.service';
import { AdministracionService } from '../../servicios/administracion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-empleados',
  standalone: false,
  templateUrl: './empleados.component.html',
  styleUrl: './empleados.component.scss',
})
export class EmpleadosComponent implements OnInit {
  empleado: any = [];
id_empleado: any = 0;
administracion: any = [];
obj_empleado = {
    Nombre: '',
    Apellido: '',
    Direccion: '',
    Telefono: '',
    Correo: '',
  };
  validar_Nombre = true;
  validar_Apellido = true;
  validar_Direccion = true;
  validar_Telefono = true;
  validar_Correo = true;
  mostrar = false;
  botones_formulario = false;

  constructor(
    private sempleado: EmpleadoService,
    private sadmin: AdministracionService
  ) {}

  ngOnInit(): void {
    this.consulta();
    this.consulta_administracion();
  }
  consulta() {
    this.sempleado.consultar().subscribe((resultado: any) => {
      this.empleado = resultado;
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
    this.obj_empleado = {
      Nombre: '',
      Apellido: '',
      Direccion: '',
      Telefono: '',
      Correo: '',
    };
  }
  validar(funcion: any = '') {
    if (this.obj_empleado.Nombre == '') {
      this.validar_Nombre = false;
    } else {
      this.validar_Nombre = true;
    }
    if (this.obj_empleado.Apellido == '') {
      this.validar_Apellido = false;
    } else {
      this.validar_Apellido = true;
    }
    if (this.obj_empleado.Direccion == '') {
      this.validar_Direccion = false;
    } else {
      this.validar_Direccion = true;
    }
    if (this.obj_empleado.Telefono == '') {
      this.validar_Telefono = false;
    } else {
      this.validar_Telefono = true;
    }

    if (this.obj_empleado.Correo == '') {
      this.validar_Correo = false;
    } else {
      this.validar_Correo = true;
    }

    if (
      this.validar_Nombre == true &&
      this.validar_Apellido == true &&
      this.validar_Direccion == true &&
      this.validar_Telefono == true &&
      this.validar_Correo == true &&
      funcion == 'guardar'
    ) {
      this.guardar();
    }
    if (
      this.validar_Nombre == true &&
      this.validar_Apellido == true &&
      this.validar_Direccion == true &&
      this.validar_Telefono == true &&
      this.validar_Correo == true &&
      funcion == 'editar'
    ) {
      this.editar();
    }
  }

  guardar() {
    this.sempleado.insertar(this.obj_empleado).subscribe((resultado: any) => {
      if (resultado['resultado'] == 'OK') {
        this.consulta();
        Swal.fire({
          title: '¡Guardado! ',
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
          this.sempleado.eliminar(id).subscribe((datos: any) => {
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
    this.obj_empleado = {
      Nombre: items.Nombre,
      Apellido: items.Apellido,
      Direccion: items.Direccion,
      Telefono: items.Telefono,
      Correo: items.Correo,
    };
    this.id_empleado = id;
    this.botones_formulario = true;
    this.mostrar_formulario('ver');
  }
  editar() {
    this.sempleado
      .editar(this.id_empleado, this.obj_empleado)
      .subscribe((resultado: any) => {
        if (resultado['resultado'] == 'OK') {
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
