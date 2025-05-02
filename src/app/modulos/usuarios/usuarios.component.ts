import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../servicios/usuarios.service';
import { AdministracionService } from '../../servicios/administracion.service';
import Swal from 'sweetalert2';
// Si tienes problemas de optimización, puedes probar esta importación

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
  usuarios_simulados: any[] = [];
  modalResetVisible: boolean = false;
  usuarioResetId: any = null;

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

  // Variables de estado para mostrar/ocultar formularios y botones
  mostrar_simulado: boolean = false;
  botones_formulario_simulado: boolean = false;

  // Objeto para el formulario de usuario
  obj_usuarios_simulado: any = {
    Nombre: '',
    Apellido: '',
    Telefono: '',
    Correo: '',
    Cargo: '',
    Documento: '',
    clave: ''
  };

  // Validaciones simples (puedes mejorar con Angular Forms)
  validar_Nombre_simulado: boolean = true;
  validar_Apellido_simulado: boolean = true;
  validar_Telefono_simulado: boolean = true;
  validar_Correo_simulado: boolean = true;
  validar_Cargo_simulado: boolean = true;
  validar_Documento_simulado: boolean = true;
  validar_clave_simulado: boolean = true;

  // Mostrar/ocultar formulario
  mostrar_formulario_simulado(accion: string) {
    this.mostrar_simulado = accion === 'ver';
    if (!this.mostrar_simulado) {
      this.resetFormulario_simulado();
    }
  }

  // Cargar datos en el formulario para editar
  cargar_datos_simulado(usuario: any, id: any) {
    this.obj_usuarios_simulado = { ...usuario };
    this.botones_formulario_simulado = true;
    this.mostrar_simulado = true;
  }

  // Validar y guardar/editar usuario
  validar_simulado(accion: string) {
    // Validaciones básicas
    this.validar_Nombre_simulado = !!this.obj_usuarios_simulado.Nombre;
    this.validar_Apellido_simulado = !!this.obj_usuarios_simulado.Apellido;
    this.validar_Telefono_simulado = !!this.obj_usuarios_simulado.Telefono;
    this.validar_Correo_simulado = !!this.obj_usuarios_simulado.Correo;
    this.validar_Cargo_simulado = !!this.obj_usuarios_simulado.Cargo;
    this.validar_Documento_simulado = !!this.obj_usuarios_simulado.Documento;
    this.validar_clave_simulado = !!this.obj_usuarios_simulado.clave;

    if (
      this.validar_Nombre_simulado && this.validar_Apellido_simulado && this.validar_Telefono_simulado &&
      this.validar_Correo_simulado && this.validar_Cargo_simulado && this.validar_Documento_simulado && this.validar_clave_simulado
    ) {
      if (accion === 'guardar') {
        // Simulación: agregar usuario
        this.usuarios_simulados.push({ ...this.obj_usuarios_simulado, id_usuarios: Date.now() });
      } else if (accion === 'editar') {
        // Simulación: editar usuario
        const idx = this.usuarios_simulados.findIndex(u => u.id_usuarios === this.obj_usuarios_simulado.id_usuarios);
        if (idx !== -1) this.usuarios_simulados[idx] = { ...this.obj_usuarios_simulado };
      }
      this.resetFormulario_simulado();
      this.mostrar_simulado = false;
      this.botones_formulario_simulado = false;
    }
  }

  resetFormulario_simulado() {
    this.obj_usuarios_simulado = {
      Nombre: '', Apellido: '', Telefono: '', Correo: '', Cargo: '', Documento: '', clave: ''
    };
    this.botones_formulario_simulado = false;
  }

  cerrarFormulario_simulado() {
    this.mostrar_simulado = false;
    this.resetFormulario_simulado();
  }

  eliminar_simulado(id: any) {
    this.usuarios_simulados = this.usuarios_simulados.filter(u => u.id_usuarios !== id);
  }

  // Modal de reset de contraseña
  modalResetVisible_simulado: boolean = false;
  usuarioResetId_simulado: any = null;

  resetPassword_simulado(id: any) {
    this.usuarioResetId_simulado = id;
    this.modalResetVisible_simulado = true;
    // Aquí podrías mostrar el modal con *ngIf
  }

  cerrarModalReset_simulado() {
    this.modalResetVisible_simulado = false;
    this.usuarioResetId_simulado = null;
  }

  confirmarResetPassword_simulado() {
    // Simulación: lógica para resetear contraseña
    alert('Se ha enviado un correo con la nueva contraseña temporal (simulación)');
    this.cerrarModalReset_simulado();
  }

  toggleEstado_simulado(id: any) {
    const usuario = this.usuarios_simulados.find(u => u.id_usuarios === id);
    if (usuario) {
      usuario.estado = usuario.estado === 'activo' ? 'inactivo' : 'activo';
    }
  }

  // Búsqueda básica por nombre o correo
  performSearch_simulado() {
    // Aquí deberías filtrar la lista de usuarios según el término de búsqueda
    // Por simplicidad, esto es solo un placeholder
    // Puedes implementar con un pipe personalizado o lógica en el componente
  }
}
