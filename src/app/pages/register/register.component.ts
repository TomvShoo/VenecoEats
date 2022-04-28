import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Usuario } from 'src/app/interfaces/IUsuario';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  // usuario: Usuario;

  registerForm = new FormGroup({
    rut: new FormControl('', Validators.required),
    nombreP: new FormControl('', Validators.required),
    nombreS: new FormControl('', Validators.required),
    apellidoP: new FormControl('', Validators.required),
    apellidoM: new FormControl('', Validators.required),
    sexo: new FormControl('',Validators.required),
    fechaNacimiento: new FormControl(Date(),Validators.required),
    nacionalidad: new FormControl('',Validators.required),
    correo: new FormControl('',Validators.required),
    contrasenia: new FormControl('', Validators.required),
    telefono: new FormControl(0,Validators.required)
  })

  constructor() { }

  ngOnInit() {
    console.log(Date()); 
  }

  public sigPagina(clase:string){
    let pagina = document.getElementsByClassName(clase)[0]

    if (clase == 'formularioUno') {
      let sigFormulario = document.getElementsByClassName('formularioTres oculta')[0]
      sigFormulario.className = sigFormulario.className.split(' ')[0]

    } else if (clase == 'formularioTres') {
      let sigFormulario = document.getElementsByClassName('formularioCuatro oculta')[0]
      sigFormulario.className = sigFormulario.className.split(' ')[0]

    } else if (clase == 'formularioCuatro') {
      // let sigFormulario = document.getElementsByClassName('formularioCuatro oculta')[0]
      // sigFormulario.className = sigFormulario.className.split(' ')[0]
      console.log("formulario 4");
      return
    }

    pagina.className = pagina.className + " oculta"

  }

  public antPagina(clase:string){
    let pagina = document.getElementsByClassName(clase)[0]

    if (clase == "formularioTres"){
      let paginaAnterior = document.getElementsByClassName("formularioUno")[0]
      paginaAnterior.className = paginaAnterior.className.split(" ")[0]
    } else if (clase == "formularioCuatro"){
      let paginaAnterior = document.getElementsByClassName("formularioTres oculta")[0]
      paginaAnterior.className = paginaAnterior.className.split(" ")[0]
    }

    pagina.className = pagina.className + " oculta"
  }
}
