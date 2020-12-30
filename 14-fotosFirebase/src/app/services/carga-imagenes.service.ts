import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { FileItem } from '../models/file-item';


@Injectable({
  providedIn: 'root'
})
export class CargaImagenesService {

  private CARPETA_IMAGENES = 'img';

  constructor( private _angularFirestore:AngularFirestore, 
               private _angularFiresStorage:AngularFireStorage ) { }

  private guardarImagen( imagen:{ nombre:string, url:string } ){
    this._angularFirestore.collection( `/${this.CARPETA_IMAGENES}` ).add( imagen )
  }

  cargarImagenesFirebase( imagenes:FileItem[] ){
    for (const item of imagenes) {
 
      item.estaSubiendo = true;
      if ( item.progreso >= 100 ) {
        continue;
      }
 
      const file = item.archivo;
      const filePath = `${ this.CARPETA_IMAGENES }/${ item.nombreArchivo }`;
      const fileRef = this._angularFiresStorage.ref( filePath );
      const uploadTask = this._angularFiresStorage.upload(filePath, file);
 
      // con esta función nos suscribimos a los cambios en el progreso
      uploadTask.percentageChanges().subscribe( resp => item.progreso = resp);
      // obtengo el url de descarga cuando este disponible
      uploadTask.snapshotChanges().pipe(
        finalize(
          () => fileRef.getDownloadURL().subscribe( url => {
            console.log('Imagen cargada con exito');
            item.url = url;
            item.estaSubiendo = false;
            this.guardarImagen({
              nombre: item.nombreArchivo,
              url: item.url
            });
          })
        )
      ).subscribe();
    }
  }

}
