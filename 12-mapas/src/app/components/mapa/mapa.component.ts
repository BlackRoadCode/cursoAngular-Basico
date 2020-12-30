import { Component, OnInit } from '@angular/core';
import { MatSnackBar, SimpleSnackBar, _SnackBarContainer } from '@angular/material/snack-bar';
import { Marcador } from 'src/app/classes/marcador.class';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MapaEditarComponent } from './mapa-editar.component';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  public marcadores: Marcador[] = [];

  lat = 21.17382145643906;
  lng = -101.6353002206946;

  constructor( private snackBar:MatSnackBar, private _matDialog:MatDialog ) { 

    // const nuevoMarcador = new Marcador( 21.17382145643906, -101.6353002206946 );
    // this.marcadores.push( nuevoMarcador );

    if ( localStorage.getItem('marcadores') ) {
      this.marcadores = JSON.parse( localStorage.getItem('marcadores') );
    }

  }

  ngOnInit(): void {  }

  agregarMarcador( event ){
    const nuevoMarcador = new Marcador( event.coords.lat, event.coords.lng );

    this.marcadores.push( nuevoMarcador );

    this.guardarStorage();
    this.snackBar.open('Marcador Agregado', 'Cerrar', { duration:1500 });
    
  }

  guardarStorage(){
    localStorage.setItem( 'marcadores', JSON.stringify( this.marcadores ) );
  }

  editarMarcador( marcador:Marcador ){
    const dialogRef = this._matDialog.open( MapaEditarComponent, {
      width: '250px',
      data: { titulo: marcador.titulo, descripcion: marcador.descripcion }
    });

    dialogRef.afterClosed().subscribe( result => {
      
      if(!result){
        return;
      }

      marcador.titulo = result.titulo;
      marcador.descripcion = result.descripcion;

      this.guardarStorage();

      this.snackBar.open('Marcador Actualizado', 'Cerrar', { duration:1500 });

    });
  }

  borrarMarcador( index:number ){
    this.marcadores.splice(index,1);
    this.guardarStorage();
    this.snackBar.open('Marcador Eliminado', 'Cerrar', { duration:1500 });
  }

}
