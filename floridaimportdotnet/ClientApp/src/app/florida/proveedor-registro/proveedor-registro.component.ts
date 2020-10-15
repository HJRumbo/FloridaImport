import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Proveedor } from '../models/proveedor';
import { ProveedorService } from './../../services/proveedor.service';

@Component({
  selector: 'app-proveedor-registro',
  templateUrl: './proveedor-registro.component.html',
  styleUrls: ['./proveedor-registro.component.css']
})
export class ProveedorRegistroComponent implements OnInit {

  formGroup: FormGroup;
  proveedor:  Proveedor;
  verCon: boolean;
  tipo: string;
    rol: string;
  constructor(private proveedorService: ProveedorService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.rol = sessionStorage.getItem('User');

    if (this.rol == "Admin" || this.rol == null) {
      this.buildForm();
      this.verCon = false;
      this.tipo = "password";
    }
  }

  private buildForm(){
    this.proveedor = new Proveedor();
    this.proveedor.identificacion = '';
    this.proveedor.nombre = '';
    this.proveedor.descripcion = '';
    this.proveedor.correo = '';
    this.proveedor.contrasena = '';

    this.formGroup = this.formBuilder.group({
      identificacion: [this.proveedor.identificacion, [Validators.required, Validators.pattern('[0-9]*')]],
      nombre: [this.proveedor.nombre, Validators.required],
      descripcion: [this.proveedor.descripcion, Validators.required],
      correo: [this.proveedor.correo, [Validators.required, Validators.email]],
      contrasena: [this.proveedor.contrasena, [Validators.required, Validators.minLength(8), Validators.maxLength(20)]]
    });
  }

  get control(){

    return this.formGroup.controls;
  }

  onSubmit(){
    if(this.formGroup.invalid){
      return;
    }
    this.add();
  }

  resultado = 0;

  add() {

    this.proveedor = this.formGroup.value;
    this.proveedorService.post(this.proveedor).subscribe(p => {
      if (p != null) {
        
        this.proveedor = p;

      }
    });
  }

  ver(){

    if(this.verCon != true){
    this.tipo = "text";
    this.verCon = true;
    }else{
      this.tipo = "password";
      this.verCon = false;
    }
  }

}
