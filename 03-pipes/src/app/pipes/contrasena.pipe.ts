import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'contrasena'
})
export class ContrasenaPipe implements PipeTransform {


  transform(value: string, activar: boolean): unknown {

    if (activar) {

      let arr: string[] = [];
      let nomContrasena: string;

      for (var i = 0; i < value.length; i++) {

        arr.push('*');
        nomContrasena = arr.join('');
      }

      return nomContrasena;

    } else {
      return value;
    }
    
  }

}
