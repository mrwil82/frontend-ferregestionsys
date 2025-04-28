import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './estructura/nav/nav.component';
import { AsideComponent } from './estructura/aside/aside.component';
import { ContentComponent } from './estructura/content/content.component';
import { FooterComponent } from './estructura/footer/footer.component';
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
import { PedidoinsertarComponent } from './modulos/pedidoinsertar/pedidoinsertar.component';
import { PedidosComponent } from './modulos/pedidos/pedidos.component';
import { ClientesComponent } from './modulos/clientes/clientes.component';
import { GestionDeSedesComponent } from './modulos/gestion-de-sedes/gestion-de-sedes.component';
import { ConfiguracionGeneralComponent } from './modulos/configuracion-general/configuracion-general.component';
import { ConfiguracionSeguridadComponent } from './modulos/configuracion-seguridad/configuracion-seguridad.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    AsideComponent,
    ContentComponent,
    FooterComponent,
    PrincipalComponent,
    DashboardComponent,
    AdministracionComponent,
    ComprasComponent,
    ContabilidadComponent,
    EmpleadosComponent,
    InventarioComponent,
    VentasComponent,
    Soporte_TecnicoComponent,
    ProveedoresComponent,
    UsuariosComponent,
    LoginComponent,
    NoEncontroComponent,
    PedidoinsertarComponent,
    PedidosComponent,
    ClientesComponent,
    GestionDeSedesComponent,
    ConfiguracionGeneralComponent,
    ConfiguracionSeguridadComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [provideHttpClient(withInterceptorsFromDi())],
  bootstrap: [AppComponent],
})
export class AppModule {}
