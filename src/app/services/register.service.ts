import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { stringify } from 'querystring';
import { Observable } from 'rxjs';
import { IUsuario } from '../interfaces/IUsuario';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private url:string = "https://yavoy-api.herokuapp.com/"

  constructor(private client:HttpClient) { }

  public postUsuario(usuario:IUsuario): Observable<IUsuario>{
    return this.client.post<IUsuario>(`${this.url}delivery/`, JSON.stringify(usuario), {
      headers: {"Content-Type": "application/json"}
    })
  }
}