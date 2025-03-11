import { Component, OnInit } from '@angular/core';
import { InventarioService } from '../../servicios/inventario.service';
import { Soporte_TecnicoService } from '../../servicios/soporte_tecnico.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inventario',
  standalone: false,
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.scss'],
})
export class InventarioComponent implements OnInit {
  inventario: any;
  id_inventario: any;
  soporte_tecnico: any;
  obj_inventario = {
    Producto: '',
    Cantidad: '',
    Precio: 0,
    Referencia: '',
    Proveedor: '',
  };
  validar_Producto = true;
  validar_Cantidad = true;
  validar_Precio = true;
  validar_Referencia = true;
  validar_Proveedor = true;
  mostrar = false;
  botones_formulario = false;

  constructor(
    private sinventario: InventarioService,
    private ssoporte_tecnico: Soporte_TecnicoService
  ) {}

  ngOnInit(): void {
    this.consulta();
  }
  consulta() {
    this.sinventario.consultar().subscribe((resultado: any) => {
      this.inventario = resultado;
    });
  }
  consulta_soporte() {
    this.ssoporte_tecnico.consultar().subscribe((resultado: any) => {
      this.soporte_tecnico = resultado;
    });
  }
  mostrar_formulario(dato: any) {
    this.mostrar = dato == 'ver' ? true : false;
  }
  limpiar() {
    this.obj_inventario = {
      Producto: '',
      Cantidad: '',
      Precio: 0,
      Referencia: '',
      Proveedor: '',
    };
  }
  validar(funcion: any) {
    if (this.obj_inventario.Producto == '') {
      this.validar_Producto = false;
    } else {
      this.validar_Producto = true;
    }
    if (this.obj_inventario.Cantidad == '') {
      this.validar_Cantidad = false;
    } else {
      this.validar_Cantidad = true;
    }
    if (this.obj_inventario.Precio == 0) {
      this.validar_Precio = false;
    } else {
      this.validar_Precio = true;
    }
    if (this.obj_inventario.Referencia == '') {
      this.validar_Referencia = false;
    } else {
      this.validar_Referencia = true;
    }
    if (this.obj_inventario.Proveedor == '') {
      this.validar_Proveedor = false;
    } else {
      this.validar_Proveedor = true;
    }
    if (
      this.validar_Producto == true &&
      this.validar_Cantidad == true &&
      this.validar_Precio == true &&
      this.validar_Referencia == true &&
      this.validar_Proveedor == true &&
      funcion == 'guardar'
    ) {
      this.guardar();
    }
    if (
      this.validar_Producto == true &&
      this.validar_Cantidad == true &&
      this.validar_Precio == true &&
      this.validar_Referencia == true &&
      this.validar_Proveedor == true &&
      funcion == 'editar'
    ) {
      this.editar();
    }
  }
  guardar() {
    this.sinventario.insertar(this.obj_inventario).subscribe((datos: any) => {
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
          this.sinventario.eliminar(id).subscribe((datos: any) => {
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
    this.obj_inventario = {
      Producto: items.Producto,
      Cantidad: items.Cantidad,
      Precio: items.Precio,
      Referencia: items.Referencia,
      Proveedor: items.Proveedor,
    };

    this.id_inventario = id;
    this.botones_formulario = true;
    this.mostrar_formulario('ver');
  }
  editar() {
    this.sinventario
      .editar(this.id_inventario, this.obj_inventario)
      .subscribe((datos: any) => {
        if (datos['resultado'] == 'OK') {
          this.consulta();
          Swal.fire({
            title: '¡Editado!',
            text: 'Los datos han sido editados correctamente',
            icon: 'success',
            padding: '2em',
            width: '26em',
          });
        }
      });

    this.limpiar();
    this.mostrar_formulario('no ver');
  }
}
