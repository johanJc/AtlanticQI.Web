import { Component, inject, TemplateRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ModalDismissReasons, NgbModal, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { ClientService } from './services/client.service';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@Component({
	selector: 'app-root',
	imports: [RouterOutlet, NgbTooltipModule, SidebarComponent],
	templateUrl: './app.component.html',
	styleUrl: './app.component.css'
})
export class AppComponent {
	title = 'AtlanticQI.Web';
	modalService = inject(NgbModal);
	clientService = inject(ClientService);
	closeResult;

	ngOnInit(){
		this.getClients();
	}

	getClients() {
		this.clientService.getClients().subscribe({
			next: (data) => {
				console.log("DATA :", data)
			},
			error:(error) => {

			}
		})
	}

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
