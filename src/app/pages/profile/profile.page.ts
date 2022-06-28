import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { ActivatedRoute } from '@angular/router';
import { IUser } from './user.model';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
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

  private estado = 'activo';
  private setEstado = '';

  constructor(
    private service: UserService,
    private alertCtrl: AlertController
  ) {}

  userRut: string = '202224776';

  ngOnInit() {
    this.service.getUser(this.userRut).then((res) => {
      this.userInfo = res.data[0];
      console.log(this.userInfo);
      this.user = res.data[0];
    });

    const colorSet = document.getElementById('estado');

    if (this.estado == 'activo') {
      if (colorSet) {
        colorSet.style.color = 'white';
        colorSet.style.textShadow = `0 0 5px #25d366,
        0 0 10px #48ee85, 0 0 15px #0ec0a5`;
        this.setEstado = 'Activo';
      }
    } else if (this.estado == 'inactivo') {
      colorSet.style.color = 'white';
      colorSet.style.textShadow = `0 0 5px #ff002b, 0 0 10px #f50202, 0 0 15px #e15c5c`;
      this.setEstado = 'Inactivo';
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
            this.service.deleteUser(this.userRut);
            window.location.reload();
            //Redireccionar luego a pagina de registro
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

              // if (res.pass != '') {
              //   res.pass
              // }

              var newData: IUser = {
                id: this.user.id,
                p_nombre: this.user.p_nombre,
                s_nombre: this.user.s_nombre,
                p_apellido: this.user.p_apellido,
                m_apellido: this.user.m_apellido,
                Rut_Rep: this.user.Rut_Rep,
                Nacionalidad: this.user.Nacionalidad,
                Genero: this.user.Genero,
                Correo: res.correo,
              };

              //sustituir por metodo luego que aclaremos lo de la db
              console.log(newData);
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
}
