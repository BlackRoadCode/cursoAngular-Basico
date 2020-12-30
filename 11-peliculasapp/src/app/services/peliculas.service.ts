import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { CarteleraResponse, Movie } from '../interfaces/cartelera-response';
import { CreditsResponse, Cast } from '../interfaces/credits-response';
import { MovieResponse } from '../interfaces/movie-response';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private baseUrl:string = 'https://api.themoviedb.org/3';
  private pageCartelera:number = 1;
  public cargando:boolean = false;

  constructor( private _httpClient:HttpClient ) {  }

  get params(){
    return {
      api_key:'d6cbe90b852098c68c62376d0b7e50ad',
      language:'es-Es',
      page: this.pageCartelera.toString()
    }
  }

  getCartelera():Observable<Movie[]>{

    if (this.cargando) {
      return of([]);
    }

    this.cargando = true;
    return this._httpClient.get<CarteleraResponse>(`${this.baseUrl}/movie/now_playing`,{params:this.params}).pipe(
      map( (resp) => resp.results ), 
      tap( () => { 
        this.pageCartelera += 1 
        this.cargando = false;
      } ) );
  }

  buscarPeliculas( texto:string ):Observable<Movie[]>{

    const params = { ...this.params, page:'1', query:texto }
    return this._httpClient.get<CarteleraResponse>( `${this.baseUrl}/search/movie`, { params } ).pipe(
      map( resp => resp.results )
    );

  }

  resetCarteleraPage(){
    this.pageCartelera = 1;
  }

  getPeliculaDetalle( id:string ){
    return this._httpClient.get<MovieResponse>(`${this.baseUrl}/movie/${id}`, {params: this.params} ).pipe( catchError( err => of(null) ) );
  }
  
  getCast( id:string ):Observable<Cast[]>{
    return this._httpClient.get<CreditsResponse>(`${this.baseUrl}/movie/${id}/credits`, {params: this.params} ).pipe(
      map( resp => resp.cast ),
      catchError( err => of([]) )
    );

  }

}


