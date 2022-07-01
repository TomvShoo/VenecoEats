import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IUsuario } from 'app/interfaces/IUsuario';
import { RegisterService } from 'app/services/register.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public estado_nroDocumento: boolean = false;
  public tipoContrasenia = 'password';

  registerForm: FormGroup = new FormGroup({
    rut: new FormControl('', [Validators.required, Validators.maxLength(9)]),
    nombreP: new FormControl(null, { validators: Validators.required }),
    nombreS: new FormControl(''),
    apellidoP: new FormControl('', Validators.required),
    apellidoM: new FormControl(''),
    sexo: new FormControl('', Validators.required),
    // fechaNacimiento: new FormControl('',Validators.required),
    nroDocumento: new FormControl(''),
    nacionalidad: new FormControl('', Validators.required),
    correo: new FormControl('', [Validators.required, Validators.email]),
    contrasenia: new FormControl('', Validators.required),
    // telefono: new FormControl('',Validators.required)
  });

  constructor(private servicio: RegisterService, private router: Router) {}

  ngOnInit() {}

  // public mostrarFecha(){
  //   console.log(this.registerForm.value.fechaNacimiento);
  // }

  public mostrarContrasenia() {
    this.tipoContrasenia =
      this.tipoContrasenia == 'password' ? 'text' : 'password';
    // if (this.tipoContrasenia == 'password') {

    //   this.tipoContrasenia = 'text'
    // } else {
    //   this.tipoContrasenia = 'password'
    // }
  }

  public sigPagina(clase: string) {
    let pagina = document.getElementsByClassName(clase)[0];

    if (clase == 'formularioUno') {
      let sigFormulario = document.getElementsByClassName(
        'formularioTres oculta'
      )[0];
      sigFormulario.className = sigFormulario.className.split(' ')[0];
    } else if (clase == 'formularioTres') {
      let sigFormulario = document.getElementsByClassName(
        'formularioCuatro oculta'
      )[0];
      sigFormulario.className = sigFormulario.className.split(' ')[0];
    } else if (clase == 'formularioCuatro') {
      // let sigFormulario = document.getElementsByClassName('formularioCuatro oculta')[0]
      // sigFormulario.className = sigFormulario.className.split(' ')[0]
      console.log('formulario 4');
      return;
    }

    pagina.className = pagina.className + ' oculta';
  }

  public antPagina(clase: string) {
    let pagina = document.getElementsByClassName(clase)[0];

    if (clase == 'formularioTres') {
      let paginaAnterior = document.getElementsByClassName('formularioUno')[0];
      paginaAnterior.className = paginaAnterior.className.split(' ')[0];
    } else if (clase == 'formularioCuatro') {
      let paginaAnterior = document.getElementsByClassName(
        'formularioTres oculta'
      )[0];
      paginaAnterior.className = paginaAnterior.className.split(' ')[0];
    }

    pagina.className = pagina.className + ' oculta';
  }

  public handleEstadoNroDocumento(e) {
    let nacionalidad = e.detail.value;
    if (nacionalidad != 'chilena') {
      this.estado_nroDocumento = true;
    } else {
      this.estado_nroDocumento = false;
    }
  }

  public validarPagina2() {
    let llaves = Object.keys(this.registerForm.value).filter((m) => {
      return m != 'contrasenia';
    });
    // console.log(llaves);

    for (let i = 0; i < llaves.length; i++) {
      if (this.registerForm.get(llaves[i]).status === 'INVALID') {
        return true;
      }
    }
    return false;
  }

  public onSubmit(e) {
    let nuevoUsuario: IUsuario = {
      rut: this.registerForm.value.rut,
      p_nombre: this.registerForm.value.nombreP,
      s_nombre: this.registerForm.value.nombreS,
      p_apellido: this.registerForm.value.apellidoP,
      s_apellido: this.registerForm.value.apellidoM,
      nro_documento: parseInt(this.registerForm.value.nroDocumento),
      nacionalidad: this.registerForm.value.nacionalidad,
      calificaion: '---',
      genero: this.registerForm.value.sexo,
      correo: this.registerForm.value.correo,
      password: this.registerForm.value.contrasenia,
    };
    console.log(nuevoUsuario.password);

    this.servicio.postUsuario(nuevoUsuario).subscribe((data) => {
      return;
    });
    this.goHome();
  }

  goHome() {
    this.router.navigateByUrl('');
  }
}
