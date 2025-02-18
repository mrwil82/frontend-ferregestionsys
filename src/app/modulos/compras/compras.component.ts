import { Component, OnInit } from '@angular/core';
import { ComprasService } from '../../servicios/compras.service';
import { ContabilidadService } from '../../servicios/contabilidad.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-compras',
  standalone: false,
  templateUrl: './compras.component.html',
  styleUrl: './compras.component.scss',
})
export class ComprasComponent implements OnInit {
  compras: any = [];
  contabilidad: any = [];
  id_compras: any ;
  obj_compras = {
    Unidades: 0,
    Valor_compra: 0,
    Proveedor: '',
    Producto: '',
    Referencia: '',
  };

  validar_Unidades = true;
  validar_Valor_compra = true;
  validar_Proveedor = true;
  validar_Producto = true;
  validar_Referencia = true;
  mostrar = false;
  botones_formulario = false;

  constructor(
    private scompras: ComprasService,
    private scontabilidad: ContabilidadService
  ) {}

  ngOnInit(): void {
    this.consulta();
  }
  consulta() {
    this.scompras.consultar().subscribe((resultado: any) => {
      this.compras = resultado;
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
    this.obj_compras = {
      Unidades: 0,
      Valor_compra: 0,
      Proveedor: '',
      Producto: '',
      Referencia: '',
    };
  }
  validar(funcion: any) {
    if (this.obj_compras.Unidades == 0) {
      this.validar_Unidades = false;
    } else {
      this.validar_Unidades = true;
    }
    if (this.obj_compras.Valor_compra == 0) {
      this.validar_Valor_compra = false;
    } else {
      this.validar_Valor_compra = true;
    }
    if (this.obj_compras.Proveedor == '') {
      this.validar_Proveedor = false;
    } else {
      this.validar_Proveedor = true;
    }
    if (this.obj_compras.Producto == '') {
      this.validar_Producto = false;
    } else {
      this.validar_Producto = true;
    }
    if (this.obj_compras.Referencia == '') {
      this.validar_Referencia = false;
    } else {
      this.validar_Referencia = true;
    }

    if (
      this.validar_Unidades == true &&
      this.validar_Valor_compra == true &&
      this.validar_Proveedor == true &&
      this.validar_Producto == true &&
      this.validar_Referencia == true &&
      funcion == 'guardar'
    ) {
      this.guardar();
    }
    if (
      this.validar_Unidades == true &&
      this.validar_Valor_compra == true &&
      this.validar_Proveedor == true &&
      this.validar_Producto == true &&
      this.validar_Referencia == true &&
      funcion == 'editar'
    ) {
      this.editar();
    }
  }
  guardar() {
    this.scompras.insertar(this.obj_compras).subscribe((datos: any) => {
      if (datos['resultado'] == 'OK') {
        this.consulta();
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
          this.scompras.eliminar(id).subscribe((datos: any) => {
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
    this.obj_compras = {
      Unidades: items.Unidades,
      Valor_compra: items.Valor_compra,
      Proveedor: items.Proveedor,
      Producto: items.Producto,
      Referencia: items.Referencia,
    };
    this.id_compras = id;
    this.botones_formulario = true;
    this.mostrar_formulario('ver');
  }
  editar() {
    this.scompras
      .editar(this.id_compras, this.obj_compras)
      .subscribe((datos: any) => {
        if (datos['resultado'] == 'OK') {
          this.consulta();
        }
      });

    this.limpiar();
    this.mostrar_formulario('no ver');
  }
}
