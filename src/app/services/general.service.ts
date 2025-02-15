import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor() { }

  //CONTROL DEL LOADING
  private _loading: BehaviorSubject<any> = new BehaviorSubject<any>(false);
  // Subscripción al loading  
  get loadingObser() {
    return this._loading.asObservable();
  }
  // Mostrar u ocultar el loading
  set setLoading(showLoading: boolean) {
    this._loading.next(showLoading);
  }

}
