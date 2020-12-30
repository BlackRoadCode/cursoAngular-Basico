import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidadoresService } from 'src/app/services/validadores.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  form:FormGroup;

  constructor( private _formBuilder:FormBuilder, private _validadoresService:ValidadoresService ) { 
    this.crearFormulario();
    this.cargarFormulario();
    this.crearListeners();
  }

  ngOnInit(): void {
  }

  get nombreValido(){
    return this.form.get('nombre').valid && this.form.get('nombre').touched;
  }
  
  get nombreNoValido(){
    return this.form.get('nombre').invalid && this.form.get('nombre').touched;
  }

  get apellidoValido(){
    return this.form.get('apellido').valid && this.form.get('apellido').touched;
  }
  
  get apellidoNoValido(){
    return this.form.get('apellido').invalid && this.form.get('apellido').touched;
  }
  
  get emailValido(){
    return this.form.get('email').valid && this.form.get('email').touched;
  }

  get emailNoValido(){
    return this.form.get('email').invalid && this.form.get('email').touched;
  }
  
  get nicknameValido(){
    return this.form.get('nickname').valid && this.form.get('nickname').touched;
  }

  get nicknameNoValido(){
    return this.form.get('nickname').invalid && this.form.get('nickname').touched;
  }
  
  get calleValido(){
    return this.form.get('direccion.calle').valid && this.form.get('direccion.calle').touched;
  }

  get calleNoValido(){
    return this.form.get('direccion.calle').invalid && this.form.get('direccion.calle').touched;
  }
  
  get ciudadValido(){
    return this.form.get('direccion.ciudad').valid && this.form.get('direccion.ciudad').touched;
  }

  get ciudadNoValido(){
    return this.form.get('direccion.ciudad').invalid && this.form.get('direccion.ciudad').touched;
  }
  
  
  get pasatiempos(){
    return this.form.get('pasatiempos') as FormArray;
  }
  
  get pass1NoValido(){
    return this.form.get('pass1').invalid && this.form.get('pass1').touched;
  }
  
  get pass2NoValido(){
    const PASS1 = this.form.get('pass1').value;
    const PASS2 = this.form.get('pass2').value;

    return (PASS1 === PASS2) ? false : true;
  }
  
  get pass2Valido(){
    const PASS1 = this.form.get('pass1').value;
    const PASS2 = this.form.get('pass2').value;

    return ((PASS1 === PASS2) ? true : false) && (this.form.get('pass2').touched);
  }

  crearFormulario(){
    // Se crea el formulario (ver html para entender la referencia a 'form')
    this.form = this._formBuilder.group( {
      // Por cada campo se crea una propiedad que es un arreglo:
      /**
       * 1er elemento: Valor por defecto que contiene el campo/propiedad
       * 2do elemento: Validaciones síncronas, las que se ejecutan en el momento, que no esperan el resultado de una llamada a service, etc.
       * 3er elemento: Validaciones asíncronas
       */
      nombre:['', [Validators.required, Validators.minLength(4) ]],
      apellido:['', [Validators.required, Validators.minLength(4), this._validadoresService.noHerrera ]],
      email:['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+[\.][a-z]{2,3}$')]],
      nickname:['', [Validators.required, Validators.minLength(4) ], this._validadoresService.existeUsuario],
      pass1:['', [Validators.required, Validators.minLength(4) ]],
      pass2:['', [Validators.required, Validators.minLength(4) ]],
      direccion: this._formBuilder.group({
        calle:['', Validators.required],
        ciudad:['', Validators.required],
      }),
      pasatiempos: this._formBuilder.array([])
    }, {
      Validators: this._validadoresService.passwordsMatch( 'pass1', 'pass2' )
    } );
  }

  crearListeners(){
    // this.form.valueChanges.subscribe( valor => {
    //   console.log( valor );
    // });

    // this.form.statusChanges.subscribe( status => console.log( {status} ) );

    this.form.get('nombre').valueChanges.subscribe(console.log);

  }

  cargarFormulario(){
    this.form.reset({
    // this.form.setValue({
      nombre:'Pedro',
      apellido:'Navaja',
      email:'cuchillo@mail.com',
      pass1: '1234',
      pass2: '1234',
      direccion:{
        calle:'salsipuedes',
        ciudad:'ny'
      },
      pasatiempos:[ ]
    });
  }

  agregarPasatiempo(){
    this.pasatiempos.push( this._formBuilder.control('', Validators.required) );
  }
  
  eliminarPasatiempo(i:number){
    this.pasatiempos.removeAt( i );
  }

  guardar(){
    console.log(this.form);

    if ( this.form.invalid ) {
      
      Object.values( this.form.controls ).forEach( control =>{ 

        if (control.valid) {
          return;
        } else {

          if (control instanceof FormGroup) {
            Object.values( control.controls ).forEach( control => control.markAsTouched() );
          }

          control.markAsTouched();
        }

       });

      return;
    }

    console.log(this.form.value);
    this.form.reset();
  }
 
}
