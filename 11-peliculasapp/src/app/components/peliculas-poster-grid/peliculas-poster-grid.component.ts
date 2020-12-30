import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StarRatingComponent } from 'ng-starrating';
import { Movie } from 'src/app/interfaces/cartelera-response';

@Component({
  selector: 'app-peliculas-poster-grid',
  templateUrl: './peliculas-poster-grid.component.html',
  styleUrls: ['./peliculas-poster-grid.component.css']
})
export class PeliculasPosterGridComponent implements OnInit {

  @Input() movies:Movie[]; 

  constructor( private _router:Router ) { }

  ngOnInit(): void {
    // console.log( this.movies );
  }

  onMovieClic( movie:Movie ){

    this._router.navigate(['/pelicula', movie.id]);

  }

}
