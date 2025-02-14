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
  clientEdit: Client;
  titleModal = 'Agregar cliente';

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

  /**
   * Almacena el cliente a editar en la variable clientEdit para que al abrir al modal este cargue la data en el formulario
   * establece el nombre del modal como Editar cliente
   * @param client Cliente a editar
   */
  editClient(client: Client) {
    this.titleModal = 'Editar cliente';
    this.clientEdit = client;
  }

  updateTable(event: Client) {
    const index = this.clients.findIndex(client => client.idClient === event.idClient);
    if (index !== -1) {
      // Si el cliente existe, actualiza la información
      this.clients[index] = event;
    } else {
      // Si no existe, agrega el nuevo registro
      this.clients.push(event);
    }
  }

  dropClient(id) {
    // !Mostrar alerta de  pregunta

    this.clientService.deleteClient(id).subscribe({
      next: () => {
        const index = this.clients.findIndex(client => client.idClient === id);
        if (index !== -1) {
          this.clients.splice(index, 1)
        }
      },
      error: () => {

      }
    })
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
    this.clientEdit = undefined;
    this.titleModal = 'Agregar cliente';
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
