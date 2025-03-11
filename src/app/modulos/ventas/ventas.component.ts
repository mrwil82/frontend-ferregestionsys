import { Component, OnInit } from '@angular/core';
import { VentasService } from '../../servicios/ventas.service';
import { ContabilidadService } from '../../servicios/contabilidad.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-ventas',
  standalone: false,
  templateUrl: './ventas.component.html',
  styleUrl: './ventas.component.scss',
})
export class VentasComponent implements OnInit {
  ventas: any;
  id_ventas: any;
  contabilidad: any;
  obj_ventas = {
    Fecha: '',
    Productos: '',
    Cantidad: '',
    Precio: 0,
  };
  validar_Fecha = true;
  validar_Productos = true;
  validar_Cantidad = true;
  validar_Precio = true;
  botones_formulario = false;
  mostrar = false;

  constructor(
    private sventas: VentasService,
    private scontabilidad: ContabilidadService
  ) {}

  ngOnInit(): void {
    this.consulta();
  }
  consulta() {
    this.sventas.consultar().subscribe((resultado: any) => {
      this.ventas = resultado;
    });
  }
  consulta_contabilidad() {
    this.scontabilidad.consultar().subscribe((resultado: any) => {
      this.contabilidad = resultado;
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
    this.obj_ventas = {
      Fecha: '',
      Productos: '',
      Cantidad: '',
      Precio: 0,
    };
  }
  validar(funcion: any) {
    if (this.obj_ventas.Fecha == '') {
      this.validar_Fecha = false;
    } else {
      this.validar_Fecha = true;
    }
    if (this.obj_ventas.Productos == '') {
      this.validar_Productos = false;
    } else {
      this.validar_Productos = true;
    }
    if (this.obj_ventas.Precio == 0) {
      this.validar_Precio = false;
    } else {
      this.validar_Precio = true;
    }
    if (this.obj_ventas.Cantidad == '') {
      this.validar_Cantidad = false;
    } else {
      this.validar_Cantidad = true;
    }

    if (
      this.validar_Fecha == true &&
      this.validar_Productos == true &&
      this.validar_Cantidad == true &&
      this.validar_Precio == true &&
      funcion == 'guardar'
    ) {
      this.guardar();
    }
    if (
      this.validar_Fecha == true &&
      this.validar_Productos == true &&
      this.validar_Cantidad == true &&
      this.validar_Precio == true &&
      funcion == 'editar'
    ) {
      this.editar();
    }
  }
  guardar() {
    this.sventas.insertar(this.obj_ventas).subscribe((datos: any) => {
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
          this.sventas.eliminar(id).subscribe((datos: any) => {
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
    this.obj_ventas = {
      Fecha: items.Fecha,
      Productos: items.Productos,
      Cantidad: items.Cantidad,
      Precio: items.Precio,
    };
    this.id_ventas = id;
    this.mostrar_formulario('ver');
    this.botones_formulario = true;
  }
  editar() {
    this.sventas
      .editar(this.id_ventas, this.obj_ventas)
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
