import { Component, OnInit } from '@angular/core';
import { ProveedorService } from '../../servicios/proveedor.service';
import { InventarioService } from '../../servicios/inventario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-proveedores',
  standalone: false,
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.scss'],
})
export class ProveedoresComponent implements OnInit {
  proveedor: any = [];
  id_proveedor:any
  inventario: any = [];
  obj_proveedor = {
    Nombre: '',
    Telefono: '',
    Correo: '',
    Direccion: '',
    Nit: '',
  };
  validar_Nombre = true;
  validar_Telefono = true;
  validar_Correo = true;
  validar_Direccion = true;
  validar_Nit = true;
  mostrar = false;
  botones_formulario = false;

  constructor(
    private sproveedor: ProveedorService,
    private sinventario: InventarioService
  ) {}

  ngOnInit(): void {
    this.consulta();
  }
  consulta() {
    this.sproveedor.consultar().subscribe((resultado: any) => {
      this.proveedor = resultado;
    });
  }
  consulta_inventario() {
    this.sinventario.consultar().subscribe((resultado: any) => {
      this.inventario = resultado;
    });
  }
  mostrar_formulario(dato: any) {
    this.mostrar = dato == 'ver' ? true : false;
  }
  limpiar() {
    this.obj_proveedor = {
      Nombre: '',
      Telefono: '',
      Correo: '',
      Direccion: '',
      Nit: '',
    };
  }
  validar(funcion: any) {
    if (this.obj_proveedor.Nombre == '') {
      this.validar_Nombre = false;
    } else {
      this.validar_Nombre = true;
    }
    if (this.obj_proveedor.Telefono == '') {
      this.validar_Telefono = false;
    } else {
      this.validar_Telefono = true;
    }
    if (this.obj_proveedor.Correo == '') {
      this.validar_Correo = false;
    } else {
      this.validar_Correo = true;
    }
    if (this.obj_proveedor.Direccion == '') {
      this.validar_Direccion = false;
    } else {
      this.validar_Direccion = true;
    }
    if (this.obj_proveedor.Nit == '') {
      this.validar_Nit = false;
    } else {
      this.validar_Nit = true;
    }
    if (
      this.validar_Nombre == true &&
      this.validar_Telefono == true &&
      this.validar_Correo == true &&
      this.validar_Direccion == true &&
      this.validar_Nit == true &&
      funcion == 'guardar'
    ) {
      this.guardar();
    }
    if (
      this.validar_Nombre == true &&
      this.validar_Telefono == true &&
      this.validar_Correo == true &&
      this.validar_Direccion == true &&
      this.validar_Nit == true &&
      funcion == 'editar'
    ) {
      this.editar();
    }
  }
  guardar() {
    this.sproveedor.insertar(this.obj_proveedor).subscribe((datos: any) => {
      if (datos['resultado'] == 'OK') {
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
      .then((result: any) => {
        if (result.isConfirmed) {
          this.sproveedor.eliminar(id).subscribe((datos: any) => {
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
    this.obj_proveedor = {
      Nombre: items.Nombre,
      Telefono: items.Telefono,
      Correo: items.Correo,
      Direccion: items.Direccion,
      Nit: items.Nit,
    };
    this.id_proveedor = id;
    this.botones_formulario = true;
    this.mostrar_formulario('ver');
  }
  editar() {
    this.sproveedor.editar(this.id_proveedor, this.obj_proveedor).subscribe(
      (datos: any) => {
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
      }
    );
    this.limpiar();
    this.mostrar_formulario('no ver');
  }
}
