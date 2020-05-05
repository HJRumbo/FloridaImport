import { Component, OnInit } from '@angular/core';
import { Cliente } from './../models/cliente';
import { ClienteService } from './../../services/cliente.service';
import { FormGroup, FormBuilder, Validators, AbstractControl} from '@angular/forms';
import { AlertModalComponent } from 'src/app/@base/alert-modal/alert-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cliente-registro',
  templateUrl: './cliente-registro.component.html',
  styleUrls: ['./cliente-registro.component.css']
})
export class ClienteRegistroComponent implements OnInit {

  formGroup: FormGroup;
  cliente:  Cliente;
  verCon: boolean;
  tipo: string;
  constructor(private clienteService: ClienteService, private formBuilder: FormBuilder, 
  private modalService: NgbModal) { }

  ngOnInit() {
    this.buildForm();
    this.verCon=false;
    this.tipo="password";
  }

  private buildForm(){
    this.cliente = new Cliente();
    this.cliente.identificacion = '';
    this.cliente.nombre = '';
    this.cliente.apellido = '';
    this.cliente.tipoPersona = '';
    this.cliente.correo = '';
    this.cliente.contrasena = '';

    this.formGroup = this.formBuilder.group({
      identificacion: [this.cliente.identificacion, Validators.required],
      nombre: [this.cliente.nombre, Validators.required],
      apellido: [this.cliente.apellido, Validators.required],
      tipoPersona: [this.cliente.tipoPersona, Validators.required],
      correo: [this.cliente.correo, [Validators.required, Validators.email]],
      contrasena: [this.cliente.contrasena, [Validators.required, Validators.minLength(8), Validators.maxLength(20)]]
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

    this.cliente = this.formGroup.value;
    this.clienteService.post(this.cliente).subscribe(c => {
      if (c != null) {
        
        this.cliente = c;

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