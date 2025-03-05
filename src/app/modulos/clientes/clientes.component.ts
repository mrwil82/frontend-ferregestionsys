import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../../servicios/clientes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  standalone: false,

  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.scss',
})
export class ClientesComponent implements OnInit {
  clientes: any;
  id_clientes: any;
  obj_clientes = {
    Nombre: '',
    Identificacion: '',
    Correo: '',
    Telefono: '',
    Ciudad: '',
    Departamento: '',
  };
  validar_Nombre = true;
  validar_Identificacion = true;
  validar_Correo = true;
  validar_Telefono = true;
  validar_Ciudad = true;
  validar_Departamento = true;
  mostrar = false;
  botones_formulario = false;

  constructor(private sclientes: ClientesService) {}

  ngOnInit(): void {
    this.consulta();
  }
  consulta() {
    this.sclientes.consultar().subscribe((resultado: any) => {
      this.clientes = resultado;
    });
  }

  mostrar_formulario(dato: any) {
    switch (dato) {
      case 'ver':
        this.mostrar = true;
        break;
      case 'no ver':
        this.mostrar = false;
        this.botones_formulario = false;
        break;
    }
  }
  limpiar() {
    this.obj_clientes = {
      Nombre: '',
      Identificacion: '',
      Correo: '',
      Telefono: '',
      Ciudad: '',
      Departamento: '',
    };
  }
  validar(funcion: any) {
    if (this.obj_clientes.Nombre == '') {
      this.validar_Nombre = false;
    } else {
      this.validar_Nombre = true;
    }
    if (this.obj_clientes.Identificacion == '') {
      this.validar_Identificacion = false;
    } else {
      this.validar_Identificacion = true;
    }
    if (this.obj_clientes.Telefono == '') {
      this.validar_Telefono = false;
    } else {
      this.validar_Telefono = true;
    }
    if (this.obj_clientes.Correo == '') {
      this.validar_Correo = false;
    } else {
      this.validar_Correo = true;
    }
    if (this.obj_clientes.Ciudad == '') {
      this.validar_Ciudad = false;
    } else {
      this.validar_Ciudad = true;
    }
    if (this.obj_clientes.Departamento == '') {
      this.validar_Departamento = false;
    } else {
      this.validar_Departamento = true;
    }

    if (
      this.validar_Nombre == true &&
      this.validar_Identificacion == true &&
      this.validar_Correo == true &&
      this.validar_Telefono == true &&
      this.validar_Ciudad == true &&
      this.validar_Departamento == true &&
      funcion == 'guardar'
    ) {
      this.guardar();
    }
    if (
      this.validar_Nombre == true &&
      this.validar_Identificacion == true &&
      this.validar_Correo == true &&
      this.validar_Telefono == true &&
      this.validar_Ciudad == true &&
      this.validar_Departamento == true &&
      funcion == 'editar'
    ) {
      this.editar();
    }
  }
  guardar() {
    this.sclientes.insertar(this.obj_clientes).subscribe((datos: any) => {
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
          this.sclientes.eliminar(id).subscribe((datos: any) => {
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
    this.obj_clientes = {
      Nombre: items.Nombre,
      Identificacion: items.Identificacion,
      Correo: items.Correo,
      Telefono: items.Telefono,
      Ciudad: items.Ciudad,
      Departamento: items.Departamento,
    };
    this.id_clientes = id;
    this.botones_formulario = true;
    this.mostrar_formulario('ver');
  }
  editar() {
    this.sclientes
      .editar(this.id_clientes, this.obj_clientes)
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
