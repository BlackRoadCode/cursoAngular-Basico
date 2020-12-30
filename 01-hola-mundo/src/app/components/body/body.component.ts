import { Component } from '@angular/core';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html'
})

export class BodyComponent {

  mostrar = true;

  frase: any = {
    mensaje: 'frase para el texto',
    autor: 'anónimo'
  };

  personajes: string[] = [ 'Héctor Lavoe', 'Rubén Blades', 'Willie Colón' ];


}
