import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

interface ErrorValidate{
  [s:string]:boolean
}

@Injectable({
  providedIn: 'root'
})
export class ValidadoresService {

  constructor() { }

  noHerrera( control:FormControl ):ErrorValidate{

    if (control.value?.toLowerCase() === 'herrera'){
      return {
        noHerrara:true
      }
    }

    return null;
  }

  passwordsMatch( pass1Name:string, pass2Name:string ){

    return (formGroup:FormGroup) => {
      const PASS_1_CONTROL = formGroup.controls[pass1Name];
      const PASS_2_CONTROL = formGroup.controls[pass2Name];

      if ( PASS_1_CONTROL.value === PASS_2_CONTROL.value ) {
        PASS_2_CONTROL.setErrors( null );
      } else {
        PASS_2_CONTROL.setErrors( { noMatch:true } );
      }


    }

  }

  existeUsuario( control:FormControl ): Promise<ErrorValidate> | Observable<ErrorValidate>{
    
    if ( !control.value ) {
      return Promise.resolve( null );
    }

    return new Promise( ( resolve, reject ) => {
      setTimeout( () => {
        if ( control.value === 'strider' ) {
          resolve({ existe:true })
        } else{
          resolve(null);
        }
      }, 4000 );
    } );

  }



}
