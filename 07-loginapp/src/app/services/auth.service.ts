import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioModel } from '../models/usuario.model';
import { map } from 'rxjs/operators';
import { getLocaleDateFormat } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private apikey = 'AIzaSyAA5WsYb1uP7iacBYXeLG6d5GHayzfVZiQ';
  userToken:string;


  // Crear nuevo usuario
  // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]


  // Ingresar con usuario existente
  // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]


  constructor( private _httpClient:HttpClient ) { 
    this.leerToken();
  }

  registrarNuevoUsuario( usuario:UsuarioModel ){

    const AUTH_DATA = {
      email: usuario.email,
      password: usuario.password,
      returnSecureToken: true
    };

    return this._httpClient.post( `${ this.url }signUp?key=${ this.apikey }`,
     AUTH_DATA).pipe( map( resp => {
        this.guardarToken( resp['idToken'] );
        return resp;
     } ) );

  }
  
  login( usuario:UsuarioModel ){

    const AUTH_DATA = {
      email: usuario.email,
      password: usuario.password,
      returnSecureToken: true
    };

    return this._httpClient.post( `${ this.url }signInWithPassword?key=${ this.apikey }`,
     AUTH_DATA).pipe( map( resp => {
       this.guardarToken( resp['idToken'] );
       return resp;
    } ) );

  };

  private guardarToken( idToken:string ){

    this.userToken = idToken;
    localStorage.setItem('token', idToken);

    let hoy = new Date();
    hoy.setSeconds(3600);

    localStorage.setItem('expira', hoy.getTime().toString());

  }

  leerToken(){
    if ( localStorage.getItem('token') ){
      this.userToken = localStorage.getItem( 'token' );
    } else {
      this.userToken = '';
    }

    return this.userToken;

  }

  estaAutenticado():boolean{

    if( this.userToken.length < 2 ){
      return false;
    }

    const EXPIRA = Number( localStorage.getItem('expira') );
    const EXPIRA_DATE = new Date();

    EXPIRA_DATE.setTime(EXPIRA);

    if (EXPIRA_DATE > new Date()){
      return true;
    } else{
      return false;
    }
    
  }

  logout(){
    localStorage.removeItem('token');
  };

}
