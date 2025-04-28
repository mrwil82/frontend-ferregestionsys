import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from '../../servicios/usuarios.service';
import { AdministracionService } from '../../servicios/administracion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.scss']
})
export class ConfiguracionComponent implements OnInit {
  saludo: string = '';
  tiempoContratacion: string = '';
  nombreUsuario: string = 'Usuario'; // Cambia esto por el nombre real del usuario si lo tienes
  fechaInicio: Date = new Date(''); // Cambia esto por la fecha real

  fotoPreview: string | ArrayBuffer | null = null;
  estadoUsuario: string = '';
  sadmin: any;
  Nombre: string | null | undefined;
  Cargo: string | null | undefined;

  constructor() { }

  ngOnInit(): void {
    this.mostrarSaludo();
    this.calcularTiempoContratacion();
    this.Nombre = sessionStorage.getItem('Nombre');
    this.Cargo = sessionStorage.getItem('Cargo');
  }

  mostrarSaludo() {
    const hora = new Date().getHours();
    if (hora < 12) {
      this.saludo = `¡Buenos días, `;
    } else if (hora < 18) {
      this.saludo = `¡Buenas tardes, `;
    } else {
      this.saludo = `¡Buenas noches, `;
    }
  }

  calcularTiempoContratacion() {
    const hoy = new Date();
    let years = hoy.getFullYear() - this.fechaInicio.getFullYear();
    let months = hoy.getMonth() - this.fechaInicio.getMonth();
    if (months < 0 || (months === 0 && hoy.getDate() < this.fechaInicio.getDate())) {
      years--;
      months += 12;
    }
    let textoTiempo = '';
    if (years > 0) textoTiempo += `${years} año${years > 1 ? 's' : ''}`;
    if (years > 0 && months > 0) textoTiempo += ' y ';
    if (months > 0) textoTiempo += `${months} mes${months > 1 ? 'es' : ''}`;
    if (years === 0 && months === 0) textoTiempo = 'Menos de un mes';
    this.tiempoContratacion = textoTiempo;
  }

  onFotoChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.fotoPreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  subirImagen() {
    this.sadmin.subirImagen(this.fotoPreview).subscribe((datos: any) => {
      if (datos['resultado'] == 'OK') {
        this.consulta();
        Swal.fire({
          title: '¡Guardado!',
          text: 'La imagen ha sido guardada correctamente',
          icon: 'success',
          padding: '2em',
          width: '32em',
        });
      }
    });
  }

  enviarEstado() {
    this.sadmin.enviarEstado(this.estadoUsuario).subscribe((datos: any) => {
      if (datos['resultado'] == 'OK') {
        this.consulta();
        Swal.fire({
          title: '¡Guardado!',
          text: 'El estado ha sido guardado correctamente',
          icon: 'success',
          padding: '2em',
          width: '32em',
        });
      }
    });
  }
  consulta() {
    throw new Error('Method not implemented.');
  }

}
