import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { ActivatedRoute } from '@angular/router';
import { IUser } from './user.model';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.css'],
})
export class ProfilePage implements OnInit {
  user: IUser;

  constructor(
    private userServices: UserService,
    private activatedRoute: ActivatedRoute,
    private alertCtrl: AlertController
  ) {}

  recipeId : string;

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      this.recipeId = paramMap.get('userId');
      this.user = this.userServices.getUser(this.recipeId);
      console.log(this.user);
    });
  }

  async deleteUser() {
    const alert = await this.alertCtrl.create({
      header: 'Eliminar Usuario',
      cssClass:'delete-alert',
      message: 'Esta accion es permanente e irrevocable, piensalo bien...',
      buttons: [
        {
          text: 'Eliminar',
          cssClass:'boton-eliminar',
          handler: () => {
            this.userServices.deleteUser(this.user.id);
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
    this.alertCtrl.create({
      header: 'Modificar Datos',
      cssClass:'modify-alert',
      message:'En esta ventana podras modificar los datos que desees',
      inputs: [
        {
          name: 'direccion',
          placeholder: 'Direccion: ' + this.user.direccion,
        },
        {
          name: 'correo',
          placeholder: 'Correo: ' + this.user.correo,
        },
      ],
      buttons: [
        {
          text: 'Confirmar',
          cssClass:'boton-modificar',
          handler: (res) => {
            //Validaciones para patch, por que no poder dejar campos en blanco es de programador garka
            if (res.direccion == '') {
              res.direccion = this.user.direccion;
            } else {
              res.direccion;
            }

            if (res.correo == '') {
              res.correo = this.user.correo;
            } else {
              res.correo;
            }

            var newData: IUser = {
              id:this.user.id,
              p_nombre: this.user.p_nombre,
              s_nombre: this.user.s_nombre,
              apellido_p: this.user.apellido_p,
              apellido_m: this.user.apellido_m,
              rut: this.user.rut,
              direccion: res.direccion,
              nacionalidad: this.user.nacionalidad,
              sexo: this.user.sexo,
              fecha_nac: this.user.fecha_nac,
              correo: res.correo,
            };

            //sustituir por metodo luego que aclaremos lo de la db
            console.log(newData);
                     
          },
        },
        {
          text:'Cancelar',
          role:'cancel'
        }
      ],
    }).then((alert) => alert.present());
  }
}
