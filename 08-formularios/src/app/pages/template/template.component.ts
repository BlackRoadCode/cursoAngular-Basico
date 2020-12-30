import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaisService } from 'src/app/services/pais.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  usuario = {
    nombre:'Pepe',
    apellido:'Sosa',
    email:'mail@mail.com',
    pais:'MEX',
    genero:'M'
  }

  paises:any[] = [];

  constructor( private _paisService:PaisService ) { }

  ngOnInit(): void {

    this._paisService.getPaises().subscribe( res =>{

      this.paises = res;

      // Se inserta una opción al inicio del arreglo cpara que el select tenga un valor por defecto

      this.paises.unshift({
        nombre: '[Seleccione un país]',
        codigo:''
      });

      // console.log(res);
      
    } );

  }

  guardar( form:NgForm ){
    console.log(form);

    if ( form.invalid ) {
      
      Object.values( form.controls ).forEach( control =>{ 

        if (control.valid) {
          return;
        } else {
          control.markAsTouched();
        }

       });

      return;
    }

    console.log(form.value);
    
    
  }

}
