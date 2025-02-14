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


}
