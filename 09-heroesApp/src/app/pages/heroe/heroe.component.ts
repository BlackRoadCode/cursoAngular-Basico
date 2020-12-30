import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { HeroeModel } from 'src/app/models/heroe.model';
import { HeroesService } from 'src/app/services/heroes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe = new HeroeModel();

  constructor( private _heroesService:HeroesService, private _activatedRoute:ActivatedRoute) { }

  ngOnInit(): void { 
    const ID = this._activatedRoute.snapshot.paramMap.get('id');

    if( ID !== 'nuevo' ){
      this._heroesService.getHeroe(ID).subscribe( (resp:HeroeModel) => {
        this.heroe = resp;
        this.heroe.id = ID;
      } );
    }
   }

  guardar( form:NgForm ){

    if ( form.invalid ) { 
      console.log( "Formulario no válido" );
      return; 
    }

    Swal.fire({
      title:'espere',
      text:'Guardando Información',
      icon: 'info',
      allowOutsideClick: false
    });

    Swal.showLoading();

    let peticion:Observable<any>;

    if (this.heroe.id) {
      //actualizar
      peticion = this._heroesService.actualizarHeroe( this.heroe );

       // Línea original antes de crear "petición" Clase 221
      //  this._heroesService.actualizarHeroe( this.heroe ).subscribe( resp => { 
      //   console.log(resp);
      //  });
    } else{
      // crear
      peticion = this._heroesService.crearHeroe( this.heroe );
      
      // Línea original antes de crear "petición" Clase 221
      // this._heroesService.crearHeroe( this.heroe ).subscribe( resp => { 
      //   console.log(resp);
      //   this.heroe = resp;
      //  });
    }

    peticion.subscribe( res => {

      Swal.fire({
        title: this.heroe.nombre,
        text: 'se actualizó correctamente',
        icon: 'success'
      });

    } );


    // console.log(form);
    // console.log(this.heroe);
  }

}
