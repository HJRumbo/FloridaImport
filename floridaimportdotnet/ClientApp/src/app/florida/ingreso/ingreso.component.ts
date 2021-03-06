import { Component, OnInit } from '@angular/core';
import { Cliente } from './../models/cliente';
import { ClienteService } from './../../services/cliente.service';
import { FormGroup, FormBuilder, Validators, AbstractControl} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertModalComponent } from 'src/app/@base/alert-modal/alert-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { first } from 'rxjs/operators';
import { Proveedor } from '../models/proveedor';
import { ProveedorService } from 'src/app/services/proveedor.service';
import Swal from 'sweetalert2';

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
  returnUrl: String;
  submitted: boolean;
  loading: boolean;

  formGroup: FormGroup;
  clientes : Cliente[];
  private login : login;
  verCon: boolean;
  tipo: string;
  cliente: Cliente;
  searchText:string;
  proveedor: Proveedor;
  proveedores: Proveedor[];
    rol: string;
  constructor(private clienteServicio: ClienteService, 
    private proveedorServicio: ProveedorService,
    private formBuilder: FormBuilder, 
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService, 
    private modalService: NgbModal) {
      // redirect to home if already logged in
      if (this.authenticationService.currentUserValue) {
        this.router.navigate(['/']);
      }
    }


  ngOnInit(): void {
    this.rol = sessionStorage.getItem('User');

    if (this.rol == null) {
      this.buildForm();
      this.login = { correo: "", contrasena: "" }
      this.verCon = false;
      this.tipo = "password";

      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }
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

  /*onSubmit() {
    if(this.formGroup.invalid){
      return;
    }
    this.acceder();
  }*/

  getCliente(){

    this.clienteServicio.get().subscribe(clientes => {
      this.clientes = clientes;

    })
  }

  acceder(){
    this.validarAcceso();
  }

  validarAcceso(){

    this.login = this.formGroup.value;
    this.clienteServicio.getCorreo(this.login.correo).subscribe(
      cliente => {
      if(cliente!==null){
        if(cliente.contrasena==this.login.contrasena){
          window.location.href= "https://localhost:5001/";//"https://floridainternationalimport.azurewebsites.net";
            sessionStorage.setItem("User" , "Clien");
            sessionStorage.setItem("Nom" , cliente.nombre);
            sessionStorage.setItem("Correo" , cliente.correo);
        }else{
          
          console.log('Contraseña incorrecta, la contraseña de no coincide con el correo '+
          cliente.correo);
          this.mensaje(cliente.correo, 'No Contraseña');
        }
      }else{
        this.proveedorServicio.getCorreo(this.login.correo).subscribe(
          proveedor => {
          if(proveedor!==null){
            
            if(proveedor.contrasena===this.login.contrasena){
              window.location.href= "https://localhost:5001/";//"https://floridainternationalimport.azurewebsites.net";
                sessionStorage.setItem("User" , "Prove");
                sessionStorage.setItem("Nom" , proveedor.nombre);
                sessionStorage.setItem("Correo" , proveedor.correo);
            }else{
              console.log('Contraseña incorrecta, la contraseña de no coincide con el correo '+
              proveedor.correo);
              this.mensaje(proveedor.correo, 'No Contraseña');
            }
          }else{
            if(this.login.correo==="admin@gmail.com" && this.login.contrasena==="1234567a"){
              window.location.href="https://localhost:5001/";//"https://floridainternationalimport.azurewebsites.net";
              sessionStorage.setItem("User" , "Admin");
              sessionStorage.setItem("Nom" , "Administrador");
      
          }else{
              this.mensaje(this.login.correo, "No Contraseña");
              console.log('El usuario con el correo'+
              this.login.correo+' no se encuentra registrado');
            
          }
          }
        });
        
      }
    });

  }


  mensaje(correo, mc){

    if(mc==='No Correo'){

        Swal.fire({
          icon: 'error',
          title: 'Resultado del ingreso...',
          text: 'El usuario con el correo '+
          correo+' no se encuentra registrado',
          confirmButtonColor: '#22bb33',
        })
        
    }else{

      Swal.fire({
        icon: 'error',
        title: 'Resultado del ingreso...',
        text: 'Contraseña incorrecta, la contraseña no coincide con el correo '+
        correo,
        confirmButtonColor: '#22bb33',
      })

    }
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

  // convenience getter for easy access to form fields
  get f() { return this.formGroup.controls; }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.formGroup.invalid) {
      return;
    }
    this.loading = true;
    this.authenticationService.login(this.f.correo.value, this.f.Contraseña.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          const modalRef = this.modalService.open(AlertModalComponent);
          modalRef.componentInstance.title = 'Acceso Denegado';
          modalRef.componentInstance.message = error.error;
          this.loading = false;
        });
  }

  salir() {
    sessionStorage.removeItem('User');
    sessionStorage.removeItem('Nom');
    sessionStorage.removeItem('Correo');
    window.location.href = "https://localhost:5001/";//"https://floridainternationalimport.azurewebsites.net";
  }
}
