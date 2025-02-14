import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertcService {

  constructor() { }

  /**
   * Alerta bonita
   * @param icon 'success' | 'info' | 'warning'
   * @param text string
   * @param title string
   * @returns 
   */
  showAlert(icon: 'success' | 'info' | 'warning', text: string, title?: string){
    let alert_ = Swal.fire({
      title: title,
      text: text,
      icon: icon
    });

    return alert_;
  }
}
