import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../servicios/usuarios.service';
import { AdministracionService } from '../../servicios/administracion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  standalone: false,
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
})
//Componente de usuarios
export class UsuariosComponent implements OnInit {
  usuarios: any;
  administracion: any;
  id_usuario: any;
  obj_usuarios = {
    Nombre: '',
    Apellido: '',
    Correo: '',
    Telefono: '',
    Cargo: '',
    Documento: '',
    clave: '',
  };
  validar_Nombre = true;
  validar_Apellido = true;
  validar_Correo = true;
  validar_Telefono = true;
  validar_Cargo = true;
  validar_Documento = true;
  validar_clave = true;
  mostrar = false;
  botones_formulario = false;

  constructor(
    private susuarios: UsuariosService,
    private sadmin: AdministracionService
  ) {}

  ngOnInit(): void {
    this.consulta();
  }
  //Consultar usuarios
  consulta() {
    this.susuarios.consultar().subscribe((resultado: any) => {
      this.usuarios = resultado;
    });
  }
  consulta_administracion() {
    this.sadmin.consultar().subscribe((resultado: any) => {
      this.administracion = resultado;
    });
  }
  //Mostrar formulario
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
  //Limpiar formulario
  limpiar() {
    this.obj_usuarios = {
      Nombre: '',
      Apellido: '',
      Correo: '',
      Telefono: '',
      Cargo: '',
      Documento: '',
      clave: '',

    };
  }
  //Validar datos
  validar(funcion: any) {
    if (this.obj_usuarios.Nombre == '') {
      this.validar_Nombre = false;
    } else {
      this.validar_Nombre = true;
    }
    if (this.obj_usuarios.Apellido == '') {
      this.validar_Apellido = false;
    } else {
      this.validar_Apellido = true;
    }
    if (this.obj_usuarios.Telefono == '') {
      this.validar_Telefono = false;
    } else {
      this.validar_Telefono = true;
    }
    if (this.obj_usuarios.Correo == '') {
      this.validar_Correo = false;
    } else {
      this.validar_Correo = true;
    }
    if (this.obj_usuarios.Cargo == '') {
      this.validar_Cargo = false;
    } else {
      this.validar_Cargo = true;
    }
    if (this.obj_usuarios.Documento == '') {
      this.validar_Documento = false;
    } else {
      this.validar_Documento = true;
    }
    if (this.obj_usuarios.clave == '') {
      this.validar_clave = false;
    } else {
      this.validar_clave = true;
    }
    if (
      this.validar_Nombre == true &&
      this.validar_Apellido == true &&
      this.validar_Correo == true &&
      this.validar_Telefono == true &&
      this.validar_Cargo == true &&
      this.validar_Documento == true &&
      this.validar_clave == true &&
      funcion == 'guardar'
    ) {
      this.guardar();
    }
    if (
      this.validar_Nombre == true &&
      this.validar_Apellido == true &&
      this.validar_Correo == true &&
      this.validar_Telefono == true &&
      this.validar_Cargo == true &&
      this.validar_Documento == true &&
      this.validar_clave == true &&
      funcion == 'editar'
    ) {
      this.editar();
    }
  }
  //Guardar datos
  guardar() {
    this.susuarios.insertar(this.obj_usuarios).subscribe((datos: any) => {
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
  //Eliminar usuario
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
          this.susuarios.eliminar(id).subscribe((datos: any) => {
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
  //Cargar datos
  cargar_datos(items: any, id: number) {
    this.obj_usuarios = {
      Nombre: items.Nombre,
      Apellido: items.Apellido,
      Correo: items.Correo,
      Telefono: items.Telefono,
      Cargo: items.Cargo,
      Documento: items.Documento,
      clave: items.clave,
    };
    this.id_usuario = id;
    this.botones_formulario = true;
    this.mostrar_formulario('ver');
  }
  //Editar usuario
  editar() {
    this.susuarios
      .editar(this.id_usuario, this.obj_usuarios)
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
