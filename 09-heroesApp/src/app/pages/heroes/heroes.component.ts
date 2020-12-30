import { Component, OnInit } from '@angular/core';
import { HeroeModel } from 'src/app/models/heroe.model';
import { HeroesService } from 'src/app/services/heroes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes:HeroeModel[] = [];
  cargando = false;

  constructor( private _heroesService:HeroesService ) { }

  ngOnInit(): void {

    this.cargando = true;

    this._heroesService.getHeroes().subscribe( resp => {
      // console.log( resp );
      this.cargando = false;
      this.heroes = resp;
    } );
  }

  borrarHeroe( heroe:HeroeModel, i:number ){

    Swal.fire({
      title:'¿Seguro que quieres borrar?',
      text: `¿Estás seguro de que quieres borrar a ${ heroe.nombre } ?`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then( resp => {
      if (resp.value){
        this.heroes.splice(i,1);
        this._heroesService.borrarHeroe( heroe.id ).subscribe(  );
      }
    });


  }

}
