import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../interfaces/IUsuario';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private url:string = "http://localhost:3000/"

  constructor(private client:HttpClient) { }

  public crearUsuario(usuario:Usuario){
    return this.client.post<Usuario>(this.url)
  }
}
