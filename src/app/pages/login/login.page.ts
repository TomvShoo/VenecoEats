import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClienteService } from 'src/app/services/cliente.service';
import { IClient } from 'src/app/services/ICliente';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular'
import { IonModal } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild(IonModal) modal: IonModal;
  credentialForm: FormGroup;
  public client: IClient = {
    rut: '',
    p_nombre: '',
    s_nombre: '',
    p_apellido: '',
    s_apellido: '',
    nro_documento: '',
    nacionalidad: '',
    genero: '',
    correo: '',
    password: '',
  };

  public c_password: '';

  private clientService: ClienteService;


  constructor(
    private fb: FormBuilder,
    service: ClienteService,
    private router: Router,
    private alertCtrl: AlertController,
    private http: HttpClient
  ) { this.clientService = service; }

  private status: boolean = false;

  sendSubmit() {
    this.clientService.addClient(this.client).subscribe((res) => {
      console.log(res);
    });
  }

  ngOnInit() {
    this.credentialForm = this.fb.group({
      correo: [''],
      password: [''],
    });
  }

  private url: string = 'https://yavoy-api.herokuapp.com/login'

  async login() {
    const user = {
      correo: this.credentialForm.value.correo,
      password: this.credentialForm.value.password
    }
    this.clientService.updateClient(user).subscribe((res) => {
      console.log(res);
      const rut = this.client.rut
      localStorage.setItem('currentUser', JSON.stringify(res).substring(57, 66))
      console.log(JSON.stringify(res))
    })
    this.router.navigateByUrl('/chat')
    this.credentialForm.reset();
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }


}



