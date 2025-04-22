import { Component, OnInit } from '@angular/core';
import { ContabilidadService } from '../../servicios/contabilidad.service';
import { VentasService } from '../../servicios/ventas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contabilidad',
  standalone: false,
  templateUrl: './contabilidad.component.html',
  styleUrls: ['./contabilidad.component.scss'],
})
export class ContabilidadComponent {
  contabilidad: any;
  ventas: any;
  id_contabilidad: any;
  obj_contabilidad = {
    Ingresos: 0,
    Egresos: 0,
    Activos: 0,
    Pasivos: 0,
  };
  validar_Ingresos = true;
  validar_Egresos = true;
  validar_Activos = true;
  validar_Pasivos = true;
  mostrar = false;
  botones_formulario = false;

  constructor(
    private scontabilidad: ContabilidadService,
    private sventas: VentasService
  ) {}

  ngOnInit(): void {
    this.consulta();
  }
  consulta() {
    this.scontabilidad.consultar().subscribe((resultado: any) => {
      this.contabilidad = resultado;
    });
  }

  consulta_ventas() {
    this.sventas.consultar().subscribe((resultado: any) => {
      this.ventas = resultado;
    });
  }
  mostrar_formulario(dato: any) {
    this.mostrar = dato == 'ver' ? true : false;
  }

  limpiar() {
    this.obj_contabilidad = {
      Ingresos: 0,
      Egresos: 0,
      Activos: 0,
      Pasivos: 0,
    };
  }
  validar(funcion: any) {
    if (this.obj_contabilidad.Ingresos == 0) {
      this.validar_Ingresos = false;
    } else {
      this.validar_Ingresos = true;
    }
    if (this.obj_contabilidad.Egresos == 0) {
      this.validar_Egresos = false;
    } else {
      this.validar_Egresos = true;
    }
    if (this.obj_contabilidad.Activos == 0) {
      this.validar_Activos = false;
    } else {
      this.validar_Activos = true;
    }
    if (this.obj_contabilidad.Pasivos == 0) {
      this.validar_Pasivos = false;
    } else {
      this.validar_Pasivos = true;
    }

    if (
      this.validar_Ingresos == true &&
      this.validar_Egresos == true &&
      this.validar_Activos == true &&
      this.validar_Pasivos == true &&
      funcion == 'guardar'
    ) {
      this.guardar();
    }
    if (
      this.validar_Ingresos == true &&
      this.validar_Egresos == true &&
      this.validar_Activos == true &&
      this.validar_Pasivos == true &&
      funcion == 'editar'
    ) {
      this.editar();
    }
  }

  guardar() {
    this.scontabilidad
      .insertar(this.obj_contabilidad)
      .subscribe((resultado: any) => {
        if (resultado['resultado'] == 'OK') {
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
      .then((result: any) => {
        if (result.isConfirmed) {
          this.scontabilidad.eliminar(id).subscribe((datos: any) => {
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
    this.obj_contabilidad = {
      Ingresos: items.Ingresos,
      Egresos: items.Egresos,
      Activos: items.Activos,
      Pasivos: items.Pasivos,
    };
    this.id_contabilidad = id;
    this.botones_formulario = true;
    this.mostrar_formulario('ver');
  }

  editar() {
    this.scontabilidad
      .editar(this.id_contabilidad, this.obj_contabilidad)
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
