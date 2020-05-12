import { Component, OnInit } from '@angular/core';
import { PaisService } from 'src/app/services/pais.service';
import { Pais } from '../models/pais';
import { Ciudad } from '../models/ciudad';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cliente } from '../models/cliente';

@Component({
  selector: 'app-agregar-ubicacion',
  templateUrl: './agregar-ubicacion.component.html',
  styleUrls: ['./agregar-ubicacion.component.css']
})
export class AgregarUbicacionComponent implements OnInit {

  paises: Pais[];
  ciudades = new Array<Ciudad>();
  formGroup: FormGroup;
  cliente: Cliente;
  ciudad: Ciudad;
  constructor(private paisServicio: PaisService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.buildForm();
    this.get();
    
  }

  private buildForm(){
    this.cliente = new Cliente();
    this.cliente.pais = '';
    this.cliente.ciudad = '';
    this.cliente.direccion = '';
    this.cliente.barrio = '';
    this.cliente.codigoPostal = '';
    this.cliente.telefono = '';

    this.formGroup = this.formBuilder.group({
      pais: [this.cliente.pais, Validators.required],
      ciudad: [this.cliente.ciudad, Validators.required],
      direccion: [this.cliente.direccion, Validators.required],
      barrio: [this.cliente.barrio, Validators.required],
      codigoPostal: [this.cliente.codigoPostal, [Validators.required, Validators.email]],
      telefono: [this.cliente.telefono, [Validators.required, Validators.minLength(8), Validators.maxLength(20)]]
    });
  }

  get control(){

    return this.formGroup.controls;
  }

  get(){

    this.paisServicio.get().subscribe(result => {
      this.paises = result;
    })
    this.getCiudades(this.paises);
  }

  getCiudades(countries: Pais[]){
    this.ciudad = new Ciudad();
    countries.forEach(element => {
      if(element.nombre===this.formGroup.get('pais').value){
        element.ciudades.forEach(ciu => {
          this.ciudad.nombre = ciu.nombre;
          
        });
        this.ciudades.push(this.ciudad);
      }
    });
  }
  
}
