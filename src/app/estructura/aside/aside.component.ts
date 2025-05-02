import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aside',
  standalone: false,
  
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent {

  Nombre: any;
  Cargo: any;
  // Variable para minimizar el aside
  isMinimized = false;

  // Lista de módulos con nombre, ruta e icono
  modulos = [
    { nombre: 'Administración', ruta: '/administracion', icono: 'fa-cogs' },
    { nombre: 'Usuarios', ruta: '/usuarios', icono: 'fa-users' },
    { nombre: 'Clientes', ruta: '/clientes', icono: 'fa-user-friends' },
    { nombre: 'Proveedores', ruta: '/proveedores', icono: 'fa-truck' },
    { nombre: 'Productos', ruta: '/productos', icono: 'fa-boxes' },
    { nombre: 'Compras', ruta: '/compras', icono: 'fa-shopping-cart' },
    { nombre: 'Ventas', ruta: '/ventas', icono: 'fa-cash-register' },
    { nombre: 'Soporte Técnico', ruta: '/soporte-tecnico', icono: 'fa-tools' },
    { nombre: 'Configuración', ruta: '/configuracion', icono: 'fa-cog' },
    { nombre: 'Seguridad', ruta: '/configuracion-seguridad', icono: 'fa-shield-alt' },
  ];

  constructor( private router: Router) { }

  ngOnInit(): void {
    this.Nombre = sessionStorage.getItem('Nombre');
    this.Cargo = sessionStorage.getItem('Cargo');
  }

  // Método para alternar minimizado
  toggleAside() {
    this.isMinimized = !this.isMinimized;
  }
}
