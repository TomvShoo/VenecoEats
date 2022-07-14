import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { IUser } from './user.model';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.css'],
})
export class ProfilePage implements OnInit {
  private user: IUser;
  private userInfo = {};

  private date = new Date();
  private now = this.date.toLocaleDateString();

  // private estado2 = this.appComponent.getValue();
  private estado = 'true';
  private setEstado = '';

  constructor(
    private service: UserService,
    private alertCtrl: AlertController,
    private router: Router
  ) {}

  private rutLocalStorage = JSON.parse(localStorage.getItem('currentUser'));
  private userRut: string = JSON.stringify(this.rutLocalStorage);

  ngOnInit() {
    this.service.getUser(this.userRut).then((res) => {
      this.userInfo = res.data[0];
      this.user = res.data[0];
    });

    const colorSet = document.getElementById('estados');

    if (this.estado == 'true') {
      if (colorSet) {
        colorSet.style.color = 'white';
        colorSet.style.textShadow = `0 0 5px #25d366,
        0 0 10px #48ee85, 0 0 15px #0ec0a5`;
        this.setEstado = 'Activo';
      }
    } else if (this.estado == 'false') {
      colorSet.style.color = 'white';
      colorSet.style.textShadow = `0 0 5px #ff002b, 0 0 10px #f50202, 0 0 15px #e15c5c`;
      this.setEstado = 'Wena';
    }
  }

  async deleteUser() {
    const alert = await this.alertCtrl.create({
      header: 'Eliminar Usuario',
      cssClass: 'delete-alert',
      message: 'Esta accion es permanente e irrevocable, piensalo bien...',
      buttons: [
        {
          text: 'Eliminar',
          cssClass: 'boton-eliminar',
          handler: () => {
            this.service.deleteUser(this.user.Rut_Rep).subscribe((res) => {
              this.router.navigateByUrl('/');
            });
          },
        },
        {
          text: 'Cancelar',
          role: 'cancel',
        },
      ],
    });
    await alert.present();
  }

  async updateUser() {
    this.alertCtrl
      .create({
        header: 'Modificar Datos',
        cssClass: 'modify-alert',
        message: 'En esta ventana podras modificar los datos que desees.',
        inputs: [
          {
            name: 'correo',
            placeholder: 'Correo: ' + this.user.Correo,
          },
          // {
          //   name: 'pass',
          //   placeholder: 'Contrasena: ',
          // },
        ],
        buttons: [
          {
            text: 'Confirmar',
            cssClass: 'boton-modificar',
            handler: (res) => {
              //Validaciones para patch, por que no poder dejar campos en blanco es de programador garka

              if (res.correo == '') {
                res.correo = this.user.Correo;
              } else {
                res.correo;
              }

              var newData = {
                p_nombre: this.user.p_nombre,
                s_nombre: this.user.s_nombre,
                p_apellido: this.user.p_apellido,
                s_apellido: this.user.s_apellido,
                rut: this.user.Rut_Rep,
                nacionalidad: this.user.Nacionalidad,
                genero: this.user.Genero,
                correo: res.correo,
              };

              this.service.updateUser(newData).subscribe((data) => {
                this.ngOnInit();
              });
            },
          },
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'cancelar-modificar',
          },
        ],
      })
      .then((alert) => alert.present());
  }

  async logOut() {
    const alert = await this.alertCtrl.create({
      header: 'Cerrar sesion',
      cssClass: 'delete-alert',
      message:
        'Al confirmar, cerraras tu sesion y volveras a la pantalla de login',
      buttons: [
        {
          text: 'Confirmar',
          cssClass: 'boton-eliminar',
          handler: () => {
            localStorage.removeItem('currentUser');
            localStorage.removeItem('currentUserId');
            this.router.navigate(['']).then(() => {
              window.location.reload();
            });
          },
        },
        {
          text: 'Cancelar',
          role: 'cancel',
        },
      ],
    });
    await alert.present();
  }
}
