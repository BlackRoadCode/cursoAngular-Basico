import { Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-grafico-barra-horizontal',
  templateUrl: './grafico-barra-horizontal.component.html',
  styleUrls: ['./grafico-barra-horizontal.component.css']
})
export class GraficoBarraHorizontalComponent implements OnDestroy {

  results: any[] = [
    {
      "name": "Juego 1",
      "value": 25
    },
    {
      "name": "Juego 2",
      "value": 20
    },
    {
      "name": "Juego 3",
      "value": 15
    },
    {
      "name": "Juego 4",
      "value": 30
    }
  ];

  multi: any[];

  // view: any[] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Population';

  colorScheme = 'nightLights';

  intervalo;

  constructor() { 

    this.intervalo = setInterval( () => {
      console.log('cambio');

      const newResults = [...this.results];
       
     for( let i in newResults ){
       newResults[i].value = Math.round( Math.random() * 500 );
     }

     this.results = [...newResults];
 
    }, 1500 );
   }

   ngOnDestroy(){
     clearInterval( this.intervalo );
   }


  onSelect(event) {
    console.log(event);
  }

}
