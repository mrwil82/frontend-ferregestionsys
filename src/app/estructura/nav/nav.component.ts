import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nav',
  standalone: false,

  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
[x: string]: any;
  Nombre: any;
  Cargo: any;
  constructor(private router: Router) {}
  ngOnInit(): void {
    this.Nombre = sessionStorage.getItem('Nombre');
    this.Cargo = sessionStorage.getItem('Cargo');
  }
  cerrar() {
    sessionStorage.setItem('id', '');
    sessionStorage.setItem('Nombre', '');
    sessionStorage.setItem('Correo', '');
    sessionStorage.setItem('Cargo', '');
    this.router.navigate(['/login']);
  }
  // Método para verificar si el usuario tiene permiso para ver un módulo
  puedeVerModulo(modulo: string): boolean {
    const permisosPorCargo: { [key: string]: string[] } = {
      'Administrador': ['dashboard', 'administracion', 'clientes','contabilidad', 'compras', 'empleados', 'inventario', 'pedidos', 'proveedores', 'soporte_tecnico', 'ventas', 'contactanos', 'configuracion'],
      'Usuario': ['dashboard', 'clientes', 'compras','inventario', 'pedidos', 'proveedores'],
      'Invitado': ['dashboard',],

    };

    const cargoUsuario = this.Cargo; // Cargo obtenido del sessionStorage
    const modulosPermitidos = permisosPorCargo[cargoUsuario] || [];
    return modulosPermitidos.includes(modulo);
  }
//Metodo para navegar a los modulos
  buscar_modulo(modulo: string) {
    if (this.puedeVerModulo(modulo)) {
      this.router.navigate([modulo]);
      Swal.fire({
        icon: 'success',
        title: 'Vamos a ' + modulo,
        showConfirmButton: false,
        position: 'center',
        width: '32em',
        padding: '2em',
        timer: 1500,
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Acceso denegado',
        text: 'No tienes permiso para acceder a este módulo.',
        showConfirmButton: true,
        position: 'center',
        width: '32em',
        padding: '2em',
      });
    }
  }
  // Método para verificar si el usuario tiene permiso para ver un módulo
  permisosPorCargo: { [key: string]: string[] } = {
    'Administrador': ['dashboard', 'administracion', 'clientes','contabilidad', 'compras', 'empleados', 'inventario', 'pedidos', 'proveedores', 'soporte_tecnico', 'ventas', 'contactanos', 'configuracion'],
    'Usuario': ['administracion', 'dashboard', 'clientes', 'contabilidad', 'compras', 'empleados', 'inventario', 'pedidos', 'proveedores', 'soporte_tecnico', 'ventas'],
    'Invitado': ['dashboard',],

  };
}
