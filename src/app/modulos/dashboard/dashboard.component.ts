import { AfterViewInit, Component, ElementRef, ViewChildren, QueryList } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements AfterViewInit {
  @ViewChildren('negocioModal, tiendaModal, reportesModal, empleadosModal') 
  modals!: QueryList<ElementRef>;

  ngAfterViewInit() {
    this.modals.forEach(modal => {
      const modalElement = modal.nativeElement;
      modalElement.addEventListener('show.bs.modal', () => {
        modalElement.removeAttribute('aria-hidden');
      });
      modalElement.addEventListener('hidden.bs.modal', () => {
        modalElement.setAttribute('aria-hidden', 'true');
      });
    });
  }
}