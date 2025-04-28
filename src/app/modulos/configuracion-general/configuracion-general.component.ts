import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-configuracion-general',
  standalone: false,
  templateUrl: './configuracion-general.component.html',
  styleUrls: ['./configuracion-general.component.scss']
})
export class ConfiguracionGeneralComponent {

  guardarConfiguracion(tipo: string) {
    let mensaje = 'Configuración guardada (simulación)';
    if (tipo === 'company') mensaje = 'Información de la empresa guardada ';
    if (tipo === 'regional') mensaje = 'Configuración regional guardada ';
    if (tipo === 'taxes') mensaje = 'Configuración de impuestos guardada ';
    if (tipo === 'operational') mensaje = 'Configuración operacional y de email guardada ';
    Swal.fire('Configuración guardada', mensaje, 'success');
    // Aquí iría la lógica real para guardar la configuración
  }

}
