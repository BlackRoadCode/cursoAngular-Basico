import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PeliculasService } from 'src/app/services/peliculas.service';

import { Movie } from 'src/app/interfaces/cartelera-response';
import { Cast } from 'src/app/interfaces/credits-response';
import { MovieResponse } from 'src/app/interfaces/movie-response';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {

  public movie:MovieResponse;
  public cast:Cast[] = [];

  constructor( private _activatedRoute:ActivatedRoute, private _peliculasService:PeliculasService, private _location:Location, private _router:Router ) { }

  ngOnInit(): void {

    const ID = this._activatedRoute.snapshot.params.id;

    combineLatest([

      this._peliculasService.getPeliculaDetalle(ID),
      this._peliculasService.getCast(ID)

    ]).subscribe( ([ movie, cast ]) => {

      if (!movie) {
            this._router.navigateByUrl('/home');
            return;
          }
          
      this.movie = movie;
      this.cast = cast.filter( actor => actor.profile_path != null );
      
    });
    
    // this._peliculasService.getPeliculaDetalle(ID).subscribe( res =>{

    //   if (!res) {
    //     this._router.navigateByUrl('/home');
    //     return;
    //   }
    //   this.movie = res;
    // });

    // this._peliculasService.getCast(ID).subscribe( cast => {
    //   this.cast = cast.filter( actor => actor.profile_path != null );
    //   // console.log( cast );      
    // } );

  }

  onRegresar(){
    this._location.back();
  }

}
