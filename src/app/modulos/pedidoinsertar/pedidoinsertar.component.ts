import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PedidosService } from '../../servicios/pedidos.service';
import { InventarioService } from '../../servicios/inventario.service';
import { ClientesService } from '../../servicios/clientes.service';

@Component({
  selector: 'app-pedidoinsertar',
  standalone: false,

  templateUrl: './pedidoinsertar.component.html',
  styleUrl: './pedidoinsertar.component.scss',
})
export class PedidoinsertarComponent {
  inventario: any;
  clientes: any;
  indent_clientes = '';
  nombre_clientes = '';
  total: any;
  productos = {
    Producto: '',
    Cantidad: '',
    Precio: '',
    Referencia: '',
    subtotal: '',
  };
  matriz_productos: any = [];
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
  consulta_inventario() {
    this.sinventario.consultar().subscribe((resultado: any) => {
      this.inventario = resultado;
    });
  }

  consulta_clientes() {
    this.sclientes
      .cclientes(this.indent_clientes)
      .subscribe((resultado: any) => {
        this.clientes = resultado;
        this.nombre_clientes = this.clientes[0].Nombre;
        //console.log(this.clientes);
      });
  }

  seleccionar(valores: any) {
    let cantidad = Number(prompt('Ingrese la cantidad a llevar'));
  
    // Validar que la cantidad sea un número válido
    if (isNaN(cantidad) || cantidad <= 0 || cantidad > valores.Cantidad) {
      alert('Cantidad no válida o excede el inventario disponible');
      return;
    }
  
    const producto = {
      Producto: valores.Producto,
      Cantidad: cantidad.toString(),
      Precio: valores.Precio,
      Referencia: valores.Referencia,
      subtotal: (cantidad * valores.Precio).toString(),
    };
  
    this.arreglo_productos.push(producto);

    this.total = 0;
    for (let i = 0; i < this.arreglo_productos.length; i++) {
      this.total += Number(this.arreglo_productos[i].subtotal);
    }

    //console.log(this.arreglo_productos);
  }
  calcularTotal(): any {
    throw new Error('metodo no implementado');
  }
}
