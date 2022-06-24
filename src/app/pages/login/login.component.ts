import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from '@angular/forms';
import { AlertController } from "@ionic/angular";

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent {

    constructor(public alertController: AlertController, private formbuilder: FormBuilder) {};

    public loginForm!: FormGroup

    ngOnInit(): void {
        this.loginForm = this.formbuilder.group({
            numero:[''],
            correo:[''],
            contrasena:['']
        })
    };


    // Alerta en caso que los datos sean erroneos
    async alertaLogin() {
        const alerta = await this.alertController.create({
          cssClass: 'alerta',
          header: 'Error',
          subHeader: '',
          message: 'Numero, correo y/o contraseña ingresados son incorrectos.',
          buttons: ['Volver a intentar']
        });
        await alerta.present();
    }

    ingreso(){
        // //this.cliente.get<any>("http://54.174.99.157:3000/usuarios")
        // .subscribe(response => {
        //    const usuario = response.find((a:any)=>{
        //        // Se verifica si los datos que ingresa ya existen en una base de datos.
        //        return a.correo === this.loginForm.value.correo && a.contrasena === this.loginForm.value.contrasena
        //    });
        //    if(usuario){
        //        // Se retesea el formulario de login
        //        this.loginForm.reset();
        //        this.router.navigate(['principal'])
        //    }
        //    else {
        //        // aqui se llama a la alarma
        //        this.alertaLogin();
        //    }
        // })
        this.alertaLogin();
    }

};