import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { switchMap, map } from 'rxjs/operators';
import { from, Observable } from 'rxjs';
import { Auth } from '@angular/fire/auth';
import { auth } from 'firebaseui';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { HttpClient } from '@angular/common/http';
import { ClienteService } from './cliente.service';
import { LoginPage } from '../pages/login/login.page';

export interface User {
  uid: string;
  email: string;
}

export interface Message {
  createdAt: Date;
  id: string;
  from: string;
  msg: string;
  fromName: string;
  myMsg: boolean;
}


@Injectable({
  providedIn: 'root'
})
export class ChatService {
  currentUser: User = null;
  private clientService: ClienteService;
  private test: LoginPage;
  user2: string;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private http: HttpClient) {
    this.afAuth.onAuthStateChanged((user) => {
      this.currentUser = user;
    });
    this.test.client.correo = this.user2;
  }

  signOut(): Promise<void> {
    return this.afAuth.signOut();
  }
}