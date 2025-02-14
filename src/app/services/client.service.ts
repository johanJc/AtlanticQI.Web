import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  http = inject(HttpClient)
  api = 'http://localhost:5232/api/';

  constructor() { }

  /**
   * Obtiene todos los clientes
   * @returns clientes
   */
  getClients(){
    const header = new HttpHeaders();
      header.set('Type-content', 'aplication/json')
      return this.http.get(this.api+'Client', {headers: header})
  }

    /**
   * Crea un nuevo cliente
   * @param client Datos del cliente a guardar
   * @returns Observable con la respuesta del servidor
   */
    createClient(client: any){
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      return this.http.post(this.api+'Client', client, { headers });
    }
}
