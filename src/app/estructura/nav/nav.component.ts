import { Component } from '@angular/core';
import { Router } from '@angular/router';

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
  
}
