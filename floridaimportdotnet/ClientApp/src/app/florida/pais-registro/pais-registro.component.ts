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
  ciudades = new Array<Ciudad>();
  UnaCiudad: boolean;
  constructor(private paisServicio: PaisService, private formBuilder: FormBuilder, 
    private router: Router, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.buildForm();
    this.UnaCiudad=true;
  }

  private buildForm(){

    this.pais = new Pais();
    this.pais.nombre="";
    this.formGroup = this.formBuilder.group({
      nombre: ['', Validators.required],
      nombreCiudad: ['', Validators.required]
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
    if(this.UnaCiudad==true){
      this.pais.ciudades;
      this.ciudad = new Ciudad();
      this.ciudad.nombre = this.formGroup.get('nombreCiudad').value;
      this.pais.ciudades.push(this.ciudad);
    }
    
    this.pais.nombre = this.formGroup.get('nombre').value;
    this.pais.ciudades;
    this.paisServicio.post(this.pais).subscribe(p => {
      if (p != null) {
        
        this.pais = p;

      }
    });

    this.buildForm();
    this.cancel();
  }  

  addCiudad(){
    this.UnaCiudad=false;
    this.pais.ciudades;
    this.ciudad = new Ciudad();
    this.ciudad.nombre = this.formGroup.get('nombreCiudad').value;
    this.pais.ciudades.push(this.ciudad);
    
  }

  cancel(){
    this.pais.ciudades.forEach(element => {
      this.pais.ciudades.shift();
    });
  }
}
