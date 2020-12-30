import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-mapa-editar',
  templateUrl: './mapa-editar.component.html',
  styleUrls: ['./mapa-editar.component.css']
})
export class MapaEditarComponent implements OnInit {

  form:FormGroup;

  constructor( public _formBuilder:FormBuilder, 
               public dialogRef: MatDialogRef<MapaEditarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      console.log(data);

      this.form = _formBuilder.group({
        'titulo': data.titulo,
        'descripcion': data.descripcion
      });
      
    }

  ngOnInit(): void {  }  
  
  guardarCambios(){
    this.dialogRef.close( this.form.value );    
  }

  onNoClick():void{
    this.dialogRef.close();
  }

}
