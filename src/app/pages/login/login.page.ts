import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ClienteService } from 'app/services/cliente.service';
import { IClient } from 'app/services/ICliente';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { IonModal } from '@ionic/angular';

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
    private alertCtrl: AlertController
  ) {
    this.clientService = service;
  }

  private status: boolean = false;

  goRegister() {
    this.router.navigateByUrl('/register');
  }

  ngOnInit() {
    this.credentialForm = this.fb.group({
      correo: [''],
      password: [''],
    });
  }
  async login() {
    const user = {
      correo: this.credentialForm.value.correo,
      password: this.credentialForm.value.password,
    };
    this.clientService.updateClient(user).subscribe(
      (res) => {
        console.log(res);
        localStorage.setItem(
          'currentUser',
          JSON.stringify(res).substring(57, 66)
        );
        if (localStorage.key(0) == 'currentUser') {
          this.alertCtrl
            .create({
              header: 'Inicio de sesión exitoso',
              buttons: [
                {
                  text: 'Continuar',
                  handler: () => {
                    this.router.navigate(['/map']).then(() => {
                      window.location.reload();
                    });
                  },
                },
              ],
            })
            .then((alert) => alert.present());
        }
        console.log(JSON.stringify(res));
      },
      (error) => {
        this.alertCtrl
          .create({
            header: 'Error al iniciar sesión',
            buttons: [
              {
                text: 'Continuar',
              },
            ],
          })
          .then((alert) => alert.present());
      }
    );
    this.credentialForm.reset();
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }
}
