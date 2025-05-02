import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../servicios/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  // Variables para el manejo de la autenticación
  Correo: any;
  clave: any;
  error = false;
  usuario: any;
  isLoading = false; // Variable para controlar estado de carga
  // Modelo de usuario
  user = {
    Nombre: '',
    Apellido: '',
    Telefono: '',
    Correo: '',
    Cargo: '',
    Documento: '',
    clave: '',
  };
  mostrarPassword = false;

  constructor(private slogin: LoginService, private router: Router) { }

  /**
   * Inicialización del componente
   * Limpia las variables de sesión al cargar
   */
  ngOnInit(): void {
    // Limpiar datos de sesión previa
    sessionStorage.setItem('id', '');
    sessionStorage.setItem('Nombre', '');
    sessionStorage.setItem('Correo', '');
    sessionStorage.setItem('Cargo', '');

    // Inicializar el evento de mostrar/ocultar contraseña
    this.initPasswordToggle();
  }

  /**
   * Inicializa el comportamiento del botón para mostrar/ocultar contraseña
   */
  initPasswordToggle(): void {
    setTimeout(() => {
      const toggleBtn = document.getElementById('togglePassword');
      const passwordInput = document.getElementById('password') as HTMLInputElement;

      if (toggleBtn && passwordInput) {
        toggleBtn.addEventListener('click', () => {
          // Cambiar entre mostrar y ocultar contraseña
          this.togglePassword();

          // Cambiar icono según estado
          const icon = toggleBtn.querySelector('i');
          if (icon) {
            icon.className = this.mostrarPassword ? 'fas fa-eye' : 'fas fa-eye-slash';
          }
        });
      }
    }, 100);
  }

  /**
   * Método para alternar la visibilidad de la contraseña
   */
  togglePassword() {
    this.mostrarPassword = !this.mostrarPassword;
  }

  /**
   * Consulta las credenciales del usuario
   * @param tecla Evento de tecla o cadena vacía para el clic del botón
   */
  consulta(tecla: any): void {
    if (tecla == 13 || tecla == '') {
      // Activar indicador de carga
      this.isLoading = true;
      this.error = false;

      this.slogin
        .consultar(this.Correo, this.clave)
        .subscribe(
          (resultado: any) => {
            this.usuario = resultado;
            console.log(this.usuario);

            if (this.usuario[0].validar == 'valido') {
              // Guardar datos en sesión si la autenticación es válida
              sessionStorage.setItem('id', this.usuario[0]['id_usuarios']);
              sessionStorage.setItem('Nombre', this.usuario[0]['Nombre']);
              sessionStorage.setItem('Correo', this.usuario[0]['Correo']);
              sessionStorage.setItem('Cargo', this.usuario[0]['Cargo']);

              // Redireccionar al dashboard
              this.router.navigate(['/dashboard']);
            } else {
              console.log('No se encontro el usuario');
              this.error = true;

              // Limpiar campos en caso de error
              this.Correo = '';
              this.clave = '';
            }

            // Desactivar indicador de carga
            this.isLoading = false;
          },
          error => {
            // Manejar errores de la API
            console.error('Error en autenticación:', error);
            this.error = true;
            this.isLoading = false;
          }
        );
    }
  }
}