import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario = new UsuarioModel;
  recordarUsuario = false;

  constructor( private _authService:AuthService, private _router:Router ) { }

  ngOnInit(): void {
    if (localStorage.getItem('email')) {
      this.usuario.email = localStorage.getItem('email');
      this.recordarUsuario = true;
    }
  }

  login( form:NgForm ){

    if ( form.invalid ) { return; } 

    Swal.fire( { 
      allowOutsideClick:false,
      icon: 'info',
      text: 'Espere por favor'
     } );

     Swal.showLoading();

    this._authService.login( this.usuario ).subscribe( resp=>{
      Swal.close();

      if (this.recordarUsuario) {
        localStorage.setItem('email', this.usuario.email);
      }

      this._router.navigateByUrl('/home');
      
    }, (err) =>{
      Swal.fire( { 
        icon: 'error',
        title: 'Error al autenticar',
        text: err.error.error.message
       } );
    });
    
  }

}
