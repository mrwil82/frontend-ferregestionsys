import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
// Si tienes problemas de optimización, puedes probar:
// import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-configuracion-seguridad',
  standalone: false,
  templateUrl: './configuracion-seguridad.component.html',
  styleUrls: ['./configuracion-seguridad.component.scss']
})
export class ConfiguracionSeguridadComponent {

  constructor() { }

  ngOnInit(): void {
  }

  guardarPermisos() {
    Swal.fire({
      icon: 'success',
      title: 'Permisos guardados correctamente',
      showConfirmButton: false,
      timer: 1500
    });
  }

  exportarHistorial() {
    Swal.fire({
      icon: 'success',
      title: 'Historial exportado correctamente',
      showConfirmButton: false,
      timer: 1500
    });
  }

  guardarSeguridad() {
    Swal.fire({
      icon: 'success',
      title: 'Configuración de seguridad guardada correctamente',
      showConfirmButton: false,
      timer: 1500
    });
  }

  filtrarHistorial() {
    Swal.fire({
      icon: 'success',
      title: 'Historial filtrado correctamente',
      showConfirmButton: false,
      timer: 1500
    });
  }



}
