import { Injectable } from '@angular/core';
import Swal, { SweetAlertResult } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertcService {

  constructor() { }

  /**
   * Muestra una alerta básica utilizando SweetAlert2.
   * 
   * @param {('success' | 'error' | 'info' | 'warning')} type - Tipo de la alerta (icono a mostrar).
   * @param {string} text - Mensaje principal de la alerta.
   * @param {string} [title] - (Opcional) Título de la alerta. Si no se proporciona, el título estará vacío.
   * 
   * @returns {Promise<SweetAlertResult>} - Retorna una promesa que se resuelve cuando la alerta es cerrada.
   * 
   * @example
   * this.alertService.showAlert('success', 'Operación exitosa', '¡Genial!');
   * this.alertService.showAlert('error', 'common error');
   */
  showAlert(
    type: 'success' | 'error' | 'info' | 'warning',
    text: string,
    title?: string    
  ){
    if(text == "common error"){
      text = "Ha ocurrido un error, inténtalo más tarde"
    }
    return Swal.fire({
      icon: type,
      text: text,
      title: title ?? '',  // Si no se pasa título, se asigna una cadena vacía    
      confirmButtonColor: '#000'  
    });
  }

  /**
   * Muestra una alerta con una pregunta, que presenta botones de confirmación y cancelación.
   * Retorna la opción seleccionada por el usuario como una promesa que resuelve a `true` si el usuario confirma,
   * o `false` si cancela o cierra la alerta.
   * 
   * @param {string} text - Mensaje principal de la alerta (pregunta).
   * @param {string} [title] - (Opcional) Título de la pregunta. Si no se proporciona, el título estará vacío.
   * @param {string} [textConfirm] - (Opcional) Texto personalizado para el botón de confirmación. Por defecto, es "Sí, confirmar".
   * @param {string} [textCancel] - (Opcional) Texto personalizado para el botón de cancelación. Si no se proporciona, el botón de cancelar no se mostrará.
   * 
   * @returns {Promise<boolean>} - Retorna una promesa que se resuelve a `true` si el usuario confirma, o `false` si cancela o cierra.
   * 
   * @example
   * const confirmed = await this.alertService.showQuestion('¿Está seguro?', 'Confirmación');
   * if (confirmed) {
   *     Usuario confirmó
   * } else {
   *     Usuario canceló
   * }
   */
  async showQuestion(text: string, title?: string, textConfirm?: string, textCancel?: string): Promise<SweetAlertResult> {
    const result = await Swal.fire({
      title: title,  // Si no se pasa título, se asigna una cadena vacía
      text: text,
      icon: 'question',
      showCancelButton: true,  // Solo se muestra botón de cancelar si se pasa un texto
      confirmButtonText: textConfirm ?? 'Si, confirmar',
      confirmButtonColor: '#000',  
      cancelButtonText: textCancel ?? 'No, cancelar',  // Texto por defecto para cancelar
    });

    return result; // Retorna true si el usuario confirma, false si cancela o cierra la alerta
  }

}
