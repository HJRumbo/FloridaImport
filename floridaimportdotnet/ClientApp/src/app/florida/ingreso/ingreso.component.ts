import { Component, OnInit } from '@angular/core';
import { Cliente } from './../models/cliente';
import { ClienteService } from './../../services/cliente.service';
import { FormGroup, FormBuilder, Validators, AbstractControl} from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.component.html',
  styleUrls: ['./ingreso.component.css']
})
export class IngresoComponent implements OnInit {

  formGroup: FormGroup;
  clientes : Cliente[];
  cliente: Cliente;
  searchText:string;
  constructor(private clienteServicio: ClienteService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.buildForm();
  }

  corre;

  private buildForm(){
    
    var correo = '';
    var contrasena = '';

    this.formGroup = this.formBuilder.group({
      correo: [correo, [Validators.required, Validators.email]],
      contrasena: [contrasena, [Validators.required, Validators.minLength(8), Validators.maxLength(20)]]
    });
  }

  get control(){

    return this.formGroup.controls;
  }

  get(){

    this.clienteServicio.get().subscribe(result => {
      this.clientes = result;

      this.ValidarIngreso();
    })
  }

  ValidarIngreso(){

    this.corre.get('correo').value;

    this.clientes.forEach(element => {
      if(this.corre === element.correo){
        this.router.navigate(['/home']);
        console.log('Entro');
      }
    });
  }
}
