import { Injectable, platformCore } from '@angular/core';
import { IUser } from './user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user: IUser[] = [
    {
      id: '1',
      p_nombre: 'Juan',
      s_nombre:'Ignacio',
      apellido_p:'Diaz',
      apellido_m:'Hernandez',
      rut:'20.713.120-2',
      direccion:'Colina 2, Torre 3, Calle 4',
      nacionalidad:'Venezolano',
      sexo:'Undefined',
      fecha_nac:'01/05/2001',
      correo:'juai.diaz@duocuc.cl',
    }
  ]

  constructor() { }

  getUser(userId:string) {
    return {
      ...this.user.find(user => {
        return user.id === userId
      })
    }
  }

  updateUser(newData:IUser, userId:string) { 
  }

  deleteUser(userId:string) {
    this.user = this.user.filter(user => {
      return user.id !== userId    
    })
  }
}
