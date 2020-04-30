import { Component, OnInit } from '@angular/core';
import { Cliente } from './../models/cliente';
import { ClienteService } from './../../services/cliente.service';
import { FormGroup, FormBuilder, Validators, AbstractControl} from '@angular/forms';
import { Router } from '@angular/router';
import { AlertModalComponent } from 'src/app/@base/alert-modal/alert-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

interface login{
  correo : string;
  contrasena : string;
}

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.component.html',
  styleUrls: ['./ingreso.component.css']
})


export class IngresoComponent implements OnInit {

  formGroup: FormGroup;
  clientes : Cliente[];
  private login : login;
  cliente: Cliente;
  searchText:string;
  constructor(private clienteServicio: ClienteService, private formBuilder: FormBuilder, 
  private router: Router, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.buildForm();
    this.login = {correo : "", contrasena : ""}
  }

  private buildForm(){

    this.formGroup = this.formBuilder.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasena: [``, [Validators.required, Validators.minLength(8), Validators.maxLength(20)]]
    });
  }

  get control(){

    return this.formGroup.controls;
  }

  onSubmit() {
    if(this.formGroup.invalid){
      return;
    }
    this.acceder();
  }

  get(){

    this.clienteServicio.get().subscribe(clientes => {
      this.clientes = clientes;

    })
  }

  acceder(){
    this.login = this.formGroup.value;
    this.clienteServicio.getCorreo(this.login.correo).subscribe(
      cliente => {
      if(cliente!==null){
        if(cliente.contrasena==this.login.contrasena){
          this.router.navigate(['/home']);
            sessionStorage.setItem("User" , "Clien");
            sessionStorage.setItem("Nom" , cliente.nombre);
        }else{
          const messageBox = this.modalService.open(AlertModalComponent)
          messageBox.componentInstance.title = "Resultado del ingreso.";
          messageBox.componentInstance.message = 'Contraseña incorrecta, la contraceña no coincide con el correo '+
          cliente.correo;
          console.log('Contraseña incorrecta, la contraceña de no coincide con el correo '+
          cliente.correo);
        }
      }else{
        const messageBox = this.modalService.open(AlertModalComponent)
        messageBox.componentInstance.title = "Resultado del ingreso.";
        messageBox.componentInstance.message = 'El usuario con el correo '+
        this.login.correo+' no se encuentra registrado';
        console.log('El usuario con el correo'+
        cliente.correo+' no se encuentra registrado');
      }
    })
  }
}
