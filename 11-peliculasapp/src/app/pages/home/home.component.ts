import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/cartelera-response';
import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  public moviesSlildeshow:Movie[] =[];
  public movies:Movie[] =[];

  @HostListener( 'window:scroll', ['$event'] )
  
  onScroll(){
    const POSITION = ( document.documentElement.scrollTop || document.body.scrollTop ) + 950;
    const MAX = ( document.documentElement.scrollHeight || document.body.scrollHeight );

    if ( POSITION > MAX ) {
      
      if (this._peliculasService.cargando) { return; }
      
      this._peliculasService.getCartelera().subscribe( movies => { 
        this.movies.push( ...movies )
       });
      
      
    }

    // console.log('Pos inicial: '+POSITION+' pos final: '+ MAX);
    
  }

  constructor( public _peliculasService:PeliculasService ) {  }
  
  ngOnInit(): void {
    this._peliculasService.getCartelera().subscribe( movies =>{
      // console.log( res );
      this.movies = movies;
      this.moviesSlildeshow = movies;
    });
  }
  
  ngOnDestroy(){
    this._peliculasService.resetCarteleraPage();
  }

}
