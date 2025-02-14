import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Client } from '../interfaces/client';

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
  getClients() {
    const header = new HttpHeaders();
    header.set('Type-content', 'aplication/json')
    return this.http.get(this.api + 'Client', { headers: header })
  }

  /**
 * Crea un nuevo cliente o lo eita si viene ya con un Id
 * @param client Datos del cliente a guardar
 * @returns Observable con la respuesta del servidor
 */
  createClient(client: Client, id) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    if (id) {
      return this.http.put(this.api + `Client/${id}`, client, { headers });
    } else {
      return this.http.post(this.api + 'Client', client, { headers });
    }
  }

  /**
   * Elimina un cliente
   * @param id id del cliente a eliminar
   * @returns 
   */
  deleteClient(id: number) {
    const header = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.delete(`${this.api}Client/${id}`, { headers: header });
  }
}
