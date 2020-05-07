import { Component, OnInit } from '@angular/core';
import { Pais } from './../models/pais';
import { Ciudad } from './../models/ciudad';
import { FormGroup, FormBuilder, Validators, AbstractControl} from '@angular/forms';
import { Router } from '@angular/router';
import { AlertModalComponent } from 'src/app/@base/alert-modal/alert-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PaisService } from 'src/app/services/pais.service';

@Component({
  selector: 'app-pais-registro',
  templateUrl: './pais-registro.component.html',
  styleUrls: ['./pais-registro.component.css']
})
export class PaisRegistroComponent implements OnInit {

  formGroup: FormGroup;
  pais: Pais;
  ciudad: Ciudad;
  ciudades: Ciudad[];
  constructor(private paisServicio: PaisService, private formBuilder: FormBuilder, 
    private router: Router, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(){

    this.pais = new Pais();
    this.pais.codigo=0;
    this.pais.nombre="";
    this.formGroup = this.formBuilder.group({
      nombrePais: [this.pais.nombre, Validators.required],
      nombreCiudad: [``, Validators.required]
    });
  }

  get control(){

    return this.formGroup.controls;
  }

  onSubmit() {
    if(this.formGroup.invalid){
      return;
    }
    this.post();
  }

  post(){

  }

  addCiudad(){
    this.pais.ciudades;
    this.ciudad = new Ciudad();
    this.ciudad.nombre = this.formGroup.get('nombreCiudad').value;
    this.ciudad.codigo=1;
    this.ciudad.codPais=1;
    this.ciudades.push(this.ciudad);

    this.ciudades.forEach(element => {
      alert("Entro: "+element.nombre);
    });
  }

}
