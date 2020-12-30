import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario:UsuarioModel;
  recordarUsuario = false;

  constructor( private _authService:AuthService, private _router:Router ) { }

  ngOnInit(): void {

    this.usuario = new UsuarioModel();    

  }

  onSubmit( form:NgForm ){

    if ( form.invalid ) { return; }

    Swal.fire( { 
      allowOutsideClick:false,
      icon: 'info',
      text: 'Espere por favor'
     } );

     Swal.showLoading();

    this._authService.registrarNuevoUsuario( this.usuario ).subscribe( resp =>{
      // console.log( resp );
      Swal.close();

      if (this.recordarUsuario) {
        localStorage.setItem('email', this.usuario.email);
      }
      // this._router.navigate(['home']); // abajo otra forma de hacer la navegación
      this._router.navigateByUrl('/home');

    }, (err => {
      Swal.fire( { 
        icon: 'error',
        title: 'Error al autenticar',
        text: err.error.error.message
       } );
    }) );

  }

}
