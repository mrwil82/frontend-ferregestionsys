import { Component } from '@angular/core';

@Component({
  selector: 'app-principal',
  standalone:false,

  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss'],
})
export class PrincipalComponent {
  title: string | undefined;
}
