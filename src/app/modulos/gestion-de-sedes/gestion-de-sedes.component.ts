import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

interface Sede {
  id: number;
  nombre: string;
  direccion: string;
  ciudad: string;
  telefono: string;
  correo: string;
}

@Component({
  selector: 'app-gestion-de-sedes',
  standalone: false,
  templateUrl: './gestion-de-sedes.component.html',
  styleUrls: ['./gestion-de-sedes.component.scss']
})
export class GestionDeSedesComponent {
  sedes: Sede[] = [
    {
      id: 1,
      nombre: 'Sede Principal',
      direccion: 'Calle 123 #45-67',
      ciudad: 'Bogotá',
      telefono: '601-1234567',
      correo: 'principal@ferregestionsys.com'
    },
    {
      id: 2,
      nombre: 'Sede Norte',
      direccion: 'Av. Norte #89-12',
      ciudad: 'Medellín',
      telefono: '604-9876543',
      correo: 'norte@ferregestionsys.com'
    }
  ];

  filtro: string = '';
  sedeEditando: Sede | null = null;
  mostrarForm: boolean = false;
  mostrarModal: boolean = false;
  sedeIdAEliminar: number | null = null;

  get sedesFiltradas(): Sede[] {
    if (!this.filtro.trim()) return this.sedes;
    const term = this.filtro.toLowerCase();
    return this.sedes.filter(sede =>
      sede.nombre.toLowerCase().includes(term) ||
      sede.ciudad.toLowerCase().includes(term)
    );
  }

  abrirForm(sede?: Sede) {
    if (sede) {
      this.sedeEditando = { ...sede };
    } else {
      this.sedeEditando = {
        id: 0,
        nombre: '',
        direccion: '',
        ciudad: '',
        telefono: '',
        correo: ''
      };
    }
    this.mostrarForm = true;
  }

  cerrarForm() {
    this.mostrarForm = false;
    this.sedeEditando = null;
  }

  guardarSede() {
    if (!this.sedeEditando) return;
    if (this.sedeEditando.id === 0) {
      // Crear nueva sede
      const nuevaSede = {
        ...this.sedeEditando,
        id: this.sedes.length ? Math.max(...this.sedes.map(s => s.id)) + 1 : 1
      };
      this.sedes.push(nuevaSede);
      Swal.fire('Sede creada correctamente');
    } else {
      // Editar sede existente
      const idx = this.sedes.findIndex(s => s.id === this.sedeEditando!.id);
      if (idx !== -1) {
        this.sedes[idx] = { ...this.sedeEditando };
        Swal.fire('Sede actualizada correctamente');
      }
    }
    this.cerrarForm();
  }

  confirmarEliminar(id: number) {
    this.sedeIdAEliminar = id;
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.sedeIdAEliminar = null;
  }

  eliminarSede() {
    if (this.sedeIdAEliminar !== null) {
      this.sedes = this.sedes.filter(s => s.id !== this.sedeIdAEliminar);
      Swal.fire('Sede eliminada correctamente');
    }
    this.cerrarModal();
  }
}
