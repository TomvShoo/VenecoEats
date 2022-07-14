import { Injectable, platformCore } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url: string = 'https://yavoy-api.herokuapp.com/delivery';
  private http: HttpClient;

  constructor(client: HttpClient) {
    this.http = client;
  }

  async getUser(userRut: string) {
    const res = await fetch(`${this.url}?rut=${userRut}`, {
      method: 'GET',
    });

    const resText = await res.text();
    return JSON.parse(resText);
  }

  updateUser(newData: any) {
    return this.http.patch(`${this.url}`, newData);
  }

  deleteUser(userRut: string) {
    return this.http.delete(`${this.url}?rut=${userRut}`);
  }
}
