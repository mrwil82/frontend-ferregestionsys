import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  url = 'http://localhost/Proyecto_sena/Backend-ferregestionsys/Controladores/login.php';

  constructor(private http: HttpClient) {}

  consultar(Correo: any, clave: any) {
    //console.log(`${this.url}?Correo=${Correo}&clave=${clave}`);
    return this.http.get(`${this.url}?Correo=${Correo}&clave=${clave}`);
  }
}