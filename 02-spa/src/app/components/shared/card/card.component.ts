import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() heroe: any = {};
  @Input() indice: number;

  @Output() heroeSeleccionado: EventEmitter<number>;

constructor(private _router: Router) {
  this.heroeSeleccionado = new EventEmitter();
}

  verHeroe(indice) {

    this._router.navigate(['/heroe', this.indice]);
    //this.heroeSeleccionado.emit( this.indice );
  }

  ngOnInit(): void {
  }

}
