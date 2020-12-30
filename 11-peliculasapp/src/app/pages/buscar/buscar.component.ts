import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/interfaces/cartelera-response';
import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  public terminoBusqueda:string;
  public movies:Movie[] =[];

  constructor( private _activatedRoute:ActivatedRoute, private _peliculasService:PeliculasService ) { }

  ngOnInit(): void {

    this._activatedRoute.params.subscribe( params => {

      this._peliculasService.buscarPeliculas( params.termino ).subscribe( movies =>{

        this.terminoBusqueda = params.termino;
        this.movies = movies;
        
      });
      
    } );

  }

}
