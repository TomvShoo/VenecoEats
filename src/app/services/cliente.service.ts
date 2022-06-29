import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IClient } from './ICliente';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private url: string = 'https://yavoy-api.herokuapp.com/delivery';
  private httpClient: HttpClient;

  constructor(client: HttpClient) {
    this.httpClient = client;
  }

  public getClient(): Observable<Array<IClient>> {
    return this.httpClient.get<Array<IClient>>(this.url, {
      headers: {
        'Content-Type': 'application/json'
      },
    });
  }

  public addClient(newClient: IClient): Observable<IClient> {
    return this.httpClient.post<IClient>(this.url, JSON.stringify(newClient), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  public deleteClient(id: number) {
    return this.httpClient.delete<any>(this.url + '/' + id).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  public updateClient(newData: any) {
    return this.httpClient.post('https://yavoy-api.herokuapp.com/login', newData);
  }
}
