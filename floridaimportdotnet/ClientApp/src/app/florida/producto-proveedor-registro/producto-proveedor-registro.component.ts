import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductoProveedor } from '../models/producto-proveedor';
import { ProductoProveedorService } from 'src/app/services/producto-proveedor.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProveedorService } from 'src/app/services/proveedor.service';

@Component({
  selector: 'app-producto-proveedor-registro',
  templateUrl: './producto-proveedor-registro.component.html',
  styleUrls: ['./producto-proveedor-registro.component.css']
})
export class ProductoProveedorRegistroComponent implements OnInit {

  formGroup: FormGroup;
  producto:  ProductoProveedor;
  url: any;
  correo: string;
  idProveedor: string;
  constructor(private productoService: ProductoProveedorService, private proveedorService: ProveedorService, private formBuilder: FormBuilder, 
  private modalService: NgbModal) { }

  ngOnInit() {
    this.buildForm();
    this.correo = sessionStorage.getItem('Correo');
    this.proveedorService.getCorreo(this.correo).subscribe(p => {
      this.idProveedor = p.identificacion;
    });
  }

  private buildForm(){
    this.producto = new ProductoProveedor()
    this.producto.nombre = '';
    this.producto.descripcion = '';
    this.producto.idProveedor = '';
    this.producto.tipo = '';

    this.formGroup = this.formBuilder.group({
      nombre: [this.producto.nombre, Validators.required],
      descripcion: [this.producto.descripcion, Validators.required],
      precio: [this.producto.precio, [Validators.required, Validators.minLength(100)]],
      tipo: [this.producto.tipo, Validators.required]
    });
  }

  get control(){

    return this.formGroup.controls;
  }

  onSubmit(){
    if(this.formGroup.invalid){
      return;
    }
    this.post();
  }

  post() {

    this.producto = this.formGroup.value;
    this.producto.idProveedor = this.idProveedor;
    this.productoService.post(this.producto).subscribe(p => {
      if (p != null) {
        
        this.producto = p;

      }
    });
  }


}
