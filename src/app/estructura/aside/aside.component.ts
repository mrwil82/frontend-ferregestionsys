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
  constructor( private router: Router) { }

  ngOnInit(): void {
    this.Nombre = sessionStorage.getItem('Nombre');
    this.Cargo = sessionStorage.getItem('Cargo');
  }

}
