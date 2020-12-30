import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Mensaje } from "../interfaces/mensaje.interface";
import { map } from "rxjs/operators";

import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';



@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<Mensaje>;

  public chats:Mensaje[] = [];
  public usuario:any ={};

  constructor( private _angularFirestore: AngularFirestore, public _angularFireAuth: AngularFireAuth ) { 
    this._angularFireAuth.authState.subscribe( user => {
      console.log('Estado del usuario: ', user);

      if (!user){
        return
      }

      this.usuario.nombre = user.displayName;
      this.usuario.uid = user.uid;
      
    } );
  }

  cargarMensajes(){

    this.itemsCollection = this._angularFirestore.collection<Mensaje>('chats', ref => ref.orderBy('fecha', 'desc').limit(5) );
    return this.itemsCollection.valueChanges().pipe(map( (mensajes:Mensaje[]) =>{
      //  console.log(mensajes);

      this.chats =[];

      for (let mensaje of mensajes) {

        this.chats.unshift(mensaje);
        
      }

      return this.chats;
    } ) );
  }

  agregarMensaje( texto:string ){
    let mensaje:Mensaje = {
      nombre:this.usuario.nombre,
      mensaje:texto,
      fecha:new Date().getTime(),
      uid: this.usuario.uid
    }

    return this.itemsCollection.add( mensaje );
  }

  login( proveedor:string ) {

    if (proveedor === 'google') {
      this._angularFireAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    } else{
      this._angularFireAuth.signInWithPopup(new firebase.auth.TwitterAuthProvider());
    }

  }

  logout() {
    this.usuario = {};
    this._angularFireAuth.signOut();
  }

}
