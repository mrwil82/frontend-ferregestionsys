import { Component } from '@angular/core';
import { LoginService } from '../../servicios/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,

  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  Correo: any;
  clave: any;
  error = false;
  usuario: any;
  user = {
    Nombre: '',
    Apellido: '',
    Telefono: '',
    Correo: '',
    Cargo: '',
    Documento: '',
    clave: '',
  };
  constructor(private slogin: LoginService, private router: Router) {}

  ngOnInit(): void {
    sessionStorage.setItem('id', '');
    sessionStorage.setItem('Nombre', '');
    sessionStorage.setItem('Correo', '');
    sessionStorage.setItem('Cargo', '');
  }

  consulta(tecla: any) {
    if (tecla == 13 || tecla == '') {
      this.slogin
        .consultar(this.Correo, this.clave)
        .subscribe((resultado: any) => {
          this.usuario = resultado;
          console.log(this.usuario);

          if (this.usuario[0].validar == 'valido') {
            sessionStorage.setItem('id', this.usuario[0]['id_usuarios']);
            sessionStorage.setItem('Nombre', this.usuario[0]['Nombre']);
            sessionStorage.setItem('Correo', this.usuario[0]['Correo']);
            sessionStorage.setItem('Cargo', this.usuario[0]['Cargo']);
            this.router.navigate(['/dashboard']);
          } else {
            console.log('No se encontro el usuario');
            this.error = true;
          }
        });
    }
  }
}
