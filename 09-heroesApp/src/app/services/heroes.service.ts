import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HeroeModel } from '../models/heroe.model';
import { map, delay } from "rxjs/operators";
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  heroe = new HeroeModel();
  private url = 'https://login-app-87e91.firebaseio.com';

  constructor( private _httpClient:HttpClient ) {  }

  crearHeroe( heroe:HeroeModel ){
    return this._httpClient.post( `${ this.url }/heroes.json`, heroe ).pipe(
      map( (resp:any) => { 
        heroe.id = resp.name;
        return heroe;
       } )
    );
  }

  actualizarHeroe( heroe:HeroeModel ){

    const HEROE_TEMP = {
      ...heroe
    };

    delete HEROE_TEMP.id;

    return this._httpClient.put( `${ this.url }/heroes/${ heroe.id }.json`, HEROE_TEMP );
  }

  borrarHeroe( id:string ){
    return this._httpClient.delete(`${this.url}/heroes/${id}.json`);
  }

  getHeroes(){
    return this._httpClient.get(`${ this.url }/heroes.json`).pipe(
      map( res => this.crearArreglo(res)) , delay(0)
    );
  }

  getHeroe( id:string ){
    return this._httpClient.get(`${this.url}/heroes/${id}.json`);
  }

  private crearArreglo( heroesObj:object ){

    const HEROES:HeroeModel[] = [];
    
    console.log(heroesObj);

    if ( heroesObj === null ) { return []; }

    Object.keys( heroesObj ).forEach( key => {
      const HEROE:HeroeModel = heroesObj[key];
      HEROE.id = key;

      HEROES.push( HEROE );
    });

    return HEROES;
  }


}
