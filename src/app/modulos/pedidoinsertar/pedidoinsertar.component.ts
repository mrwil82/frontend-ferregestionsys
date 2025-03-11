import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PedidosService } from '../../servicios/pedidos.service';
import { InventarioService } from '../../servicios/inventario.service';
import { ClientesService } from '../../servicios/clientes.service';
import { VentasService } from '../../servicios/ventas.service';

@Component({
  selector: 'app-pedidoinsertar',
  standalone: false,

  templateUrl: './pedidoinsertar.component.html',
  styleUrl: './pedidoinsertar.component.scss',
})
export class PedidoinsertarComponent {
  inventario: any;
  clientes: any;
  ident_clientes = '';
  nombre_clientes = '';
  total: any;
  productos = {
    Fecha: new Date(),
    Producto: '',
    Cantidad: '',
    Precio: 0,
    subtotal: 0,
  };
  pedidos = {
    Fecha: '',
    Productos: '',
    Cantidad: '',
    ident_clientes: '',
    inventario: 0,
    subtotal: 0,
    total: 0,
  };

  arreglo_productos: any = [];

  constructor(
    private router: Router,
    private sinventario: InventarioService,
    private sclientes: ClientesService,
    private spedidos: PedidosService
  ) {}

  ngOnInit(): void {
    this.consulta_inventario();
  }
  //metodos
  consulta_inventario() {
    this.sinventario.consultar().subscribe((resultado: any) => {
      this.inventario = resultado;
    });
  }

  consulta_clientes() {
    this.sclientes
      .cclientes(this.ident_clientes)
      .subscribe((resultado: any) => {
        this.clientes = resultado;
        this.nombre_clientes = this.clientes[0].Nombre;
        //console.log(this.clientes);
      });
  }

  seleccionar(valores: any) {
    let cantidad = Number(prompt('Ingrese la cantidad a llevar'));

    if (isNaN(cantidad) || cantidad <= 0 || cantidad > valores.Cantidad) {
      alert('Cantidad no válida o excede el inventario disponible');
      return;
    }
    const productos = {
      Fecha: new Date(),
      Producto: valores.Producto,
      Cantidad: cantidad.toString(),
      Precio: Number(valores.Precio),
      subtotal: Number(cantidad * valores.Precio),
    };

    this.arreglo_productos.push(productos);

    this.total = 0;
    for (let i = 0; i < this.arreglo_productos.length; i++) {
      this.total += Number(this.arreglo_productos[i].subtotal);
    }
  }
  
  //metodo
  calcularTotal(): any {
    throw new Error('metodo no implementado');
  }
  //metodo
  guardar() {
    if (!this.arreglo_productos.length || !this.clientes?.length || !this.inventario?.length) {
      alert('Faltan datos necesarios para crear el pedido');
      return;
    }
    let fecha = new Date();
    this.pedidos.Fecha = `${fecha.getFullYear()}-${fecha.getMonth() + 1}-${fecha.getDate()}`;
    this.pedidos.Productos = this.arreglo_productos.map((item: any) => item.Producto).join(',');
    this.pedidos.Cantidad = this.arreglo_productos.length;
    this.pedidos.ident_clientes = `${this.clientes[0].id_clientes} - ${this.nombre_clientes}`;
    this.pedidos.subtotal = this.total.toString();
    this.pedidos.total = this.total.toString();
    console.log(this.pedidos);

    this.spedidos.insertar(this.pedidos).subscribe({
      next: (datos: any) => {
        if (datos['resultado'] == 'OK') {
          console.log('Guardado');
          this.router.navigate(['/pedidos']);
        }
      },
      error: (error) => {
        console.log('Error:', error);
      }
  });
}
}
