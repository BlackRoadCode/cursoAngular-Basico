import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class PaisService {

  constructor( private _httpClient:HttpClient ) { }

  // Estudiar bien la función y simplificar los returns
  getPaises(){
    return this._httpClient.get('https://restcountries.eu/rest/v2/lang/es').pipe( 
      // map de reactive extensions (rxjs)
      map( (resp:any[]) =>{
        // map de los arrays en JS
        return resp.map( pais => {
          return {
            nombre:pais.name,
            codigo:pais.alpha3Code
          }
        } )
    } ) );
  }

}
