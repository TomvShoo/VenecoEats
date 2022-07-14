import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IPedido } from './IPedido';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  private url: string = 'https://yavoy-api.herokuapp.com/order';

  constructor(public http: HttpClient) {}

  async getPedido(idRepartidor: number) {
    const res = await fetch(`${this.url}/${idRepartidor}`, {
      method: 'GET',
    });

    const resText = await res.text();
    return JSON.parse(resText);
  }
}
