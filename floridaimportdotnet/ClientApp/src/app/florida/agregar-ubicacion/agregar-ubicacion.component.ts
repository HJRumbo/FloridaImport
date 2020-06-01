import { Component, OnInit } from '@angular/core';
import { PaisService } from 'src/app/services/pais.service';
import { Pais } from '../models/pais';
import { Ciudad } from '../models/ciudad';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cliente } from '../models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertModalComponent } from 'src/app/@base/alert-modal/alert-modal.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-agregar-ubicacion',
  templateUrl: './agregar-ubicacion.component.html',
  styleUrls: ['./agregar-ubicacion.component.css']
})
export class AgregarUbicacionComponent implements OnInit {

  paises: Pais[];
  ciudades: Ciudad[];
  formGroup: FormGroup;
  cliente: Cliente;
  clienteUbicacion: Cliente;
  ciudad: Ciudad;
  constructor(private paisServicio: PaisService, private formBuilder: FormBuilder, private clienteServicio: ClienteService, private modalService: NgbModal, private rutaActiva: ActivatedRoute) { }

  ngOnInit(): void {
    this.buildForm();
    this.get();
    
    this.cliente = new Cliente();

    const correo = this.rutaActiva.snapshot.params.correo;
    this.clienteServicio.getCorreo(correo).subscribe(c => {
      this.cliente = c;
      this.clienteUbicacion = c;
    });
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
      pais: ['', Validators.required],
      ciudad: ['', Validators.required],
      direccion: ['', Validators.required],
      barrio: ['', Validators.required],
      codigoPostal: ['', Validators.required],
      telefono: ['', Validators.required]
    });
  }

  get control(){

    return this.formGroup.controls;
  }

  get(){

    this.paisServicio.get().subscribe(result => {
      this.paises = result;
    })
  }

  getCiudades(){

    this.paises.forEach(element => {
      if(element.nombre===this.formGroup.get('pais').value){
          this.ciudades = element.ciudades;
      }
    });
  }

  onSubmit(){
    if(this.formGroup.invalid){
      return;
    }
    this.addUbicacion();
  }

  addUbicacion() {
    
    this.clienteUbicacion.pais = this.formGroup.get('pais').value;
    this.clienteUbicacion.ciudad = this.formGroup.get('ciudad').value;
    this.clienteUbicacion.direccion = this.formGroup.get('direccion').value;
    this.clienteUbicacion.barrio = this.formGroup.get('barrio').value;
    this.clienteUbicacion.codigoPostal = this.formGroup.get('codigoPostal').value;
    this.clienteUbicacion.telefono = this.formGroup.get('telefono').value;


    this.clienteServicio.put(this.clienteUbicacion).subscribe(c => {
  
        const messageBox = this.modalService.open(AlertModalComponent)

        messageBox.componentInstance.title = "Resultado de agregación de ubicación.";
        messageBox.componentInstance.message = 'Los datos fueron modificados correctamente.';
      
        
    });
    
  }
  
}
