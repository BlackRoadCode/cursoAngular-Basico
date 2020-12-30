import { Injectable } from '@angular/core';
import { Lista } from '../models/lista.model';

@Injectable({
  providedIn: 'root'
})
export class DeseosService {

    listas: Lista[] = [];

    constructor() {
        //const lista1 = new Lista('Titulo de la lista 1');
        //const lista2 = new Lista('Titulo de la lista 2');

        //this.listas.push(lista1, lista2);

        this.cargarStorage();

    }

    crearLista(titulo: string) {
        const nuevaLista = new Lista(titulo);
        this.listas.push(nuevaLista);
        this.guardarStorage();

        return nuevaLista.id;
    }

    //editarLista(idLista: number, nuevoTitulo: string) {


    //    let listaEditada = this.listas.find(listData => listData.id === idLista);

    //    listaEditada.titulo = nuevoTitulo;

    //    //this.guardarStorage();

    //    //console.log("Lista actualizada");

    //}

    cargarLista(id: string | number) {

        id = Number(id);

        return this.listas.find( listData => listData.id === id );

    }

    borrarLista(lista: Lista) {

        //this.listas = this.listas.filter( listaData => listaData.id !== lista.id);
        //this.guardarStorage();

        const index = this.listas.indexOf(lista);
        this.listas.splice(index, 1);
        this.guardarStorage();

    }

    guardarStorage() {
        localStorage.setItem( 'data', JSON.stringify(this.listas) );
    }

    cargarStorage() {

        if (localStorage.getItem('data')) {
            this.listas = JSON.parse(localStorage.getItem('data'));
        } else {
            this.listas = [];
        }


    }


}
