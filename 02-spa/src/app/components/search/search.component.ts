import { Component, OnInit, Input } from '@angular/core';
import { HeroesService, Heroe } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {

  arrHeroes: any[] = [];
  termino: string;

  constructor(private _activatedRoute: ActivatedRoute,
              private _heroesService: HeroesService) { }

  ngOnInit(): void {
    this._activatedRoute.params.subscribe(params => {

      this.termino = params['term'];
      this.arrHeroes = this._heroesService.buscarHeroes(params['term']);

      //console.log(this.arrHeroes);
    });
  }

}
