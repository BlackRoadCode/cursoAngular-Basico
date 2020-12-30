import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Lista } from '../../models/lista.model';
import { DeseosService } from '../../services/deseos.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

    listas: Lista[];

    constructor(public _deseosService: DeseosService,
                private _router: Router,
                private _alertController: AlertController) {

        this.listas = _deseosService.listas;

    }

    async presentAlert() {
        const alert = await this._alertController.create({
            cssClass: 'my-custom-class',
            header: 'Error',
            subHeader: 'No se ingresó un nombre de lista',
            message: 'Favor de ingresar un nombre a la lista.',
            buttons: ['OK']
        });

        await alert.present();
    }

    async agregarLista( ) {

        const alert = await this._alertController.create({
            cssClass: 'my-custom-class',
            header: 'Nueva Lista',
            inputs: [{
                name: 'titulo',
                type: 'text',
                placeholder: 'Nombre de la lista'
            }],
            buttons: [{
                text: 'Cancelar',
                role: 'cancel',
                handler: () => {
                    console.log('Cancelar');
                }
            }, 
                {
                    text: 'Crear',
                    handler: (data) => {
                        //console.log(data);
                        if (data.titulo.length === 0) {
                            this.presentAlert();
                            return;
                        }

                        const idLista = this._deseosService.crearLista(data.titulo);

                        this._router.navigateByUrl(`/tabs/tab1/agregar/${idLista}`);

                    }
                }
            ]
        });

        alert.present();

    }

}
