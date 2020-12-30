import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonList } from '@ionic/angular';
import { Lista } from '../../models/lista.model';
import { DeseosService } from '../../services/deseos.service';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {

    @ViewChild(IonList) lista: IonList;
    @Input() terminada = true;

    listas: Lista[];

    constructor(public _deseosService: DeseosService,
        private _router: Router, private _alertController: AlertController) {

        this.listas = _deseosService.listas;
    }

    irLista(idLista: number) {

        if (this.terminada) {
            this._router.navigateByUrl(`/tabs/tab2/agregar/${idLista}`);
        } else {
            this._router.navigateByUrl(`/tabs/tab1/agregar/${idLista}`);
        }

    }

    async editarLista(idLista:number, lista: Lista) {

        // crear alert con el titulo de la lista precargado

        const alert = await this._alertController.create({
            cssClass: 'my-custom-class',
            header: 'Editar Lista',
            inputs: [{
                name: 'titulo',
                type: 'text',
                value: lista.titulo
            }],
            buttons: [{
                text: 'Cancelar',
                role: 'cancel',
                handler: () => {
                    console.log('Cancelar');
                    this.lista.closeSlidingItems();
                }
            },
            {
                text: 'Actualizar',
                handler: (data) => {

                    let listaEditada = this.listas.find(listData => listData.id === idLista);
                    listaEditada.titulo = data.titulo;
                    this._deseosService.guardarStorage();
                    this.lista.closeSlidingItems();

                }
            }
            ]
        });

        alert.present();

        // fin de crear alert

    }

    borrarLista(item: Lista) {
        this._deseosService.borrarLista( item );
    }

  ngOnInit() {}

}
