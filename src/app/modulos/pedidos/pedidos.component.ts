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
  
  ventas: any;
  modal = false;
  productos: any;




  constructor(private router: Router, private spedidos: PedidosService) { }

  ngOnInit(): void {
    this.consulta();
}

consulta() {
  this.spedidos.consultar().subscribe((resultado: any) => {
    this.ventas = resultado;
  });
}
consultarpedidos(id: number) {
  this.spedidos.consultarpedidos(id).subscribe((resultado: any) => {
    this.productos = resultado;
  });
}
  insertar() {
    this.router.navigate(['pedidosinsertar']);
}
mostrar_modal(dato:any, id:number) {
  switch(dato){
    case 0:
      this.modal = false;
      break;
    case 1:
      this.modal = true;
      this.consultarpedidos(id);
      break;
  } 

}
}
