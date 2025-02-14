import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Client } from '../../../interfaces/client';
import { ClientService } from '../../../services/client.service';
import { AlertcService } from '../../../services/alertc.service';

@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  @Input() clientToEdit:Client;
  @Output() formComplete = new EventEmitter<any>();
  clientService = inject(ClientService);
  formBuilder = inject(FormBuilder);
  formClient: FormGroup;
  alert = inject(AlertcService);

  constructor() {
    this.formClient = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]],
      phone: ['', [Validators.maxLength(10)]],
      birthDate: [''],
      documentType: ['', Validators.required],
      documentNumber: ['', Validators.required],
      address: [''],
      city: ['']
    })
  }

  ngOnInit(){
    if(this.clientToEdit){      
      console.log("ID de cliente: ", this.clientToEdit.idClient)
      this.formClient.get('firstName').setValue(this.clientToEdit.firstName)
      this.formClient.get('lastName').setValue(this.clientToEdit.lastName)
      this.formClient.get('email').setValue(this.clientToEdit.email)
      this.formClient.get('phone').setValue(this.clientToEdit.phone)
      this.formClient.get('birthDate').setValue(this.clientToEdit.birthDate)
      this.formClient.get('documentType').setValue(this.clientToEdit.documentType)
      this.formClient.get('documentNumber').setValue(this.clientToEdit.documentNumber)
      this.formClient.get('address').setValue(this.clientToEdit.address)
      this.formClient.get('city').setValue(this.clientToEdit.city)
    }
  }

  /**
   * Agregar un cliente a la BD
   */
  saveClient() {
    if (this.formClient.invalid) {
      this.formClient.markAllAsTouched();
      return;
    }

    let data:Client = {      
      firstName: this.formClient.get('firstName').value,
      lastName: this.formClient.get('lastName').value,
      email: this.formClient.get('email').value,
      phone: this.formClient.get('phone').value,
      birthDate: this.formClient.get('birthDate').value,
      documentType: this.formClient.get('documentType').value,
      documentNumber: ''+this.formClient.get('documentNumber').value,
      address: this.formClient.get('address').value,
      city: this.formClient.get('city').value
    }

    this.clientService.createClient(data, this.clientToEdit?.idClient || null).subscribe({
      next: (result:any) => {        
        this.alert.showAlert('success', 'Cliente creado correctamente');
        this.formComplete.emit(result);
      },
      error: (error) => {

      }
    })
  }
}
