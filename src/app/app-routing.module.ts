import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './estructura/principal.component';
import { DashboardComponent } from './modulos/dashboard/dashboard.component';
import { AdministracionComponent } from './modulos/administracion/administracion.component';
import { EmpleadosComponent } from './modulos/empleados/empleados.component';
import { ContabilidadComponent } from './modulos/contabilidad/contabilidad.component';
import { InventarioComponent } from './modulos/inventario/inventario.component';
import { ProveedoresComponent } from './modulos/proveedores/proveedores.component';
import { ComprasComponent } from './modulos/compras/compras.component';
import { VentasComponent } from './modulos/ventas/ventas.component';
import { Soporte_TecnicoComponent } from './modulos/soporte_tecnico/soporte_tecnico.component';
import { UsuariosComponent } from './modulos/usuarios/usuarios.component';
import { LoginComponent } from './modulos/login/login.component';
import { NoEncontroComponent } from './modulos/no-encontro/no-encontro.component';
import { ValidaruserGuard } from './guard/validaruser.guard';
import { PedidosComponent } from './modulos/pedidos/pedidos.component';
import { PedidoinsertarComponent } from './modulos/pedidoinsertar/pedidoinsertar.component';
import { ClientesComponent } from './modulos/clientes/clientes.component';
import { ConfiguracionComponent } from './modulos/configuracion/configuracion.component';
import { ContactanosComponent } from './modulos/contactanos/contactanos.component';
import { GestionDeSedesComponent } from './modulos/gestion-de-sedes/gestion-de-sedes.component';
import { ConfiguracionGeneralComponent } from './modulos/configuracion-general/configuracion-general.component';
import { ConfiguracionSeguridadComponent } from './modulos/configuracion-seguridad/configuracion-seguridad.component';

const routes: Routes = [
  {
    path: '',
    component: PrincipalComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [ValidaruserGuard],
      },
      {
        path: 'administracion',
        component: AdministracionComponent,
        canActivate: [ValidaruserGuard],
      },
      {
        path: 'empleados',
        component: EmpleadosComponent,
        canActivate: [ValidaruserGuard],
      },
      {
        path: 'contabilidad',
        component: ContabilidadComponent,
        canActivate: [ValidaruserGuard],
      },
      {
        path: 'inventario',
        component: InventarioComponent,
        canActivate: [ValidaruserGuard],
      },
      {
        path: 'proveedores',
        component: ProveedoresComponent,
        canActivate: [ValidaruserGuard],
      },
      {
        path: 'compras',
        component: ComprasComponent,
        canActivate: [ValidaruserGuard],
      },
      {
        path: 'ventas',
        component: VentasComponent,
        canActivate: [ValidaruserGuard],
      },
      {
        path: 'soporte_tecnico',
        component: Soporte_TecnicoComponent,
        canActivate: [ValidaruserGuard],
      },
      {
        path: 'usuarios',
        component: UsuariosComponent,
        canActivate: [ValidaruserGuard],
      },
      {
        path: 'pedidos',
        component: PedidosComponent,
        canActivate: [ValidaruserGuard],
      },
      {
        path: 'pedidosinsertar',
        component: PedidoinsertarComponent,
        canActivate: [ValidaruserGuard],
      },
      {
        path: 'clientes',
        component: ClientesComponent,
        canActivate: [ValidaruserGuard]
      },

      {
        path: 'configuracion',
        component: ConfiguracionComponent,
        canActivate: [ValidaruserGuard]
      },

      {
        path: 'contactanos',
        component: ContactanosComponent,
        canActivate: [ValidaruserGuard]
      },
      {
        path: 'gestion-de-sedes',
        component: GestionDeSedesComponent,
        canActivate: [ValidaruserGuard]
      },
      {
        path: 'configuracion-general',
        component: ConfiguracionGeneralComponent,
        canActivate: [ValidaruserGuard]
      },
      {
        path: 'configuracion-seguridad',
        component: ConfiguracionSeguridadComponent,
        canActivate: [ValidaruserGuard]
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: '**', component: NoEncontroComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
