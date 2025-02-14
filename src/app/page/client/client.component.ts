import { Component, inject, TemplateRef } from '@angular/core';
import { Client } from '../../interfaces/client';
import { ClientService } from '../../services/client.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormComponent } from './form/form.component';

@Component({
  selector: 'app-client',
  imports: [FormComponent],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent {
  clients = <Client[]>[]
  modalService = inject(NgbModal);
  clientService = inject(ClientService);
  closeResult;

  ngOnInit() {
    this.getClients();
  }

  /**
   * Obtiene el listado de clientes
   */
  getClients() {
    this.clientService.getClients().subscribe({
      next: (data) => {
        this.clients = <Client[]>data;
      },
      error: (error) => {

      }
    })
  }

  updateTable(event:Client){
    this.clients.push(event);
  }

  /**
   * Abre un modal
   * @param content Contenido del modal
   */
  open(content: TemplateRef<any>) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.closeResult.set(`Closed with: ${result}`);
      },
      (reason) => {
        this.closeResult.set(`Dismissed ${this.getDismissReason(reason)}`);
      },
    );
  }

  /**
   * Cierra el modal
   * @param reason razón de cierre
   * @returns 
   */
  private getDismissReason(reason: any): string {
    switch (reason) {
      case ModalDismissReasons.ESC:
        return 'by pressing ESC';
      case ModalDismissReasons.BACKDROP_CLICK:
        return 'by clicking on a backdrop';
      default:
        return `with: ${reason}`;
    }
  }

}
