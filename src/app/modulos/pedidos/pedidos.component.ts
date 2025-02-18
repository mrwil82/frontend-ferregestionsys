import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PedidosService } from '../../servicios/pedidos.service';

@Component({
  selector: 'app-pedidos',
  standalone: false,
  
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.scss'
})
export class PedidosComponent {
  
  ventas: any = [];

  constructor(private router: Router, private spedidos: PedidosService) { }

  ngOnInit(): void {
    this.consulta();
}

consulta() {
  this.spedidos.consultar().subscribe((resultado: any) => {
    this.ventas = resultado;
  });
}
  insertar() {
    this.router.navigate(['pedidosinsertar']);
}

}
